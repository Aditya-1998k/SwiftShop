from celery import shared_task
from django.core.mail import EmailMessage
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from io import BytesIO
from .models import Order


@shared_task
def send_invoice_task(order_id):
    try:
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        return "Order not found"

    # ------------------------------
    # Generate PDF using Platypus
    # ------------------------------
    buffer = BytesIO()
    pdf = SimpleDocTemplate(buffer, pagesize=A4)

    styles = getSampleStyleSheet()
    elements = []

    # ------------------------------
    # Brand Header
    # ------------------------------
    site_name = "SwiftShop"
    header = Paragraph(f"<b>{site_name} - Invoice</b>", styles["Title"])
    elements.append(header)
    elements.append(Spacer(1, 12))

    # ------------------------------
    # Invoice & Customer Details
    # ------------------------------
    invoice_info = [
        ["Invoice Number:", f"INV-{order.id}"],
        ["Order Date:", order.created_at.strftime('%d %b %Y')],
        ["Customer Name:", order.user.username],
        ["Email:", order.user.email],
        ["Shipping Address:", 
         f"{order.address.name},{order.address.line1}, "
         f"{order.address.city}, {order.address.state} - {order.address.pincode}, "
         f"Phone: {order.address.phone}"
        ],
    ]

    invoice_table = Table(invoice_info, hAlign="LEFT", colWidths=[120, 350])
    invoice_table.setStyle(TableStyle([
        ('FONT', (0,0), (-1,-1), 'Helvetica'),
        ('FONT', (0,0), (0,-1), 'Helvetica-Bold'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))

    elements.append(invoice_table)
    elements.append(Spacer(1, 20))

    # ------------------------------
    # Items Table
    # ------------------------------
    item_data = [["Product", "Quantity", "Price", "Total"]]

    for item in order.items.all():
        item_data.append([
            item.product.name if item.product else "Deleted Product",
            str(item.quantity),
            f"Rs. {item.price}",
            f"Rs. {item.total}",
        ])

    items_table = Table(item_data, hAlign='LEFT', colWidths=[200, 70, 70, 80])
    items_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#f2f2f2")),
        ('FONT', (0,0), (-1,0), 'Helvetica-Bold'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.grey),
        ('ALIGN', (1,1), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))

    elements.append(items_table)
    elements.append(Spacer(1, 20))

    # ------------------------------
    # Price Summary
    # ------------------------------
    summary_data = [
        ["Subtotal:", f"Rs. {order.subtotal}"],
        ["Discount:", f"- Rs. {order.discount}"],
        ["Total Amount:", f"Rs. {order.total_amount}"],
    ]

    summary_table = Table(summary_data, hAlign="RIGHT", colWidths=[150, 100])
    summary_table.setStyle(TableStyle([
        ('FONT', (0,0), (-1,-1), 'Helvetica'),
        ('FONT', (0,2), (-1,2), 'Helvetica-Bold'),
        ('ALIGN', (0,0), (-1,-1), 'RIGHT'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))

    elements.append(summary_table)
    elements.append(Spacer(1, 25))

    # ------------------------------
    # Footer
    # ------------------------------
    footer = Paragraph(
        "<b>Thank you for shopping with us!</b><br/>"
        "If you have any questions, contact support@myshop.com",
        styles["Normal"]
    )
    elements.append(footer)

    # Build PDF
    pdf.build(elements)
    pdf_data = buffer.getvalue()
    buffer.close()

    # ------------------------------
    # Email PDF
    # ------------------------------
    email = EmailMessage(
        subject=f"Invoice for Order #{order.id}",
        body="Dear customer,\n\nPlease find your invoice attached.\n\nThank you for shopping with us.",
        to=[order.user.email],
    )

    email.attach(f"invoice-{order.id}.pdf", pdf_data, "application/pdf")
    email.send()

    return "Invoice sent successfully"
