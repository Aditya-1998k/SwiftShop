from celery import shared_task
from django.core.mail import EmailMessage
from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, TableStyle, Spacer
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from io import BytesIO
from .models import Payment
from orders.models import Order


@shared_task
def send_payment_receipt_task(order_id):
    try:
        order = Order.objects.get(id=order_id)
        payment = Payment.objects.get(order=order)
    except:
        return "Order/Payment not found"

    buffer = BytesIO()
    pdf = SimpleDocTemplate(buffer, pagesize=A4)
    styles = getSampleStyleSheet()
    elements = []

    # Header
    elements.append(Paragraph("<b>SwiftShop - Payment Receipt</b>", styles["Title"]))
    elements.append(Spacer(1, 15))

    # Payment Info Table
    payment_details = [
        ["Order ID:", order.id],
        ["Transaction ID:", payment.transaction_id],
        ["Payment Method:", payment.payment_method],
        ["Payment Status:", payment.status],
        ["Amount Paid:", f"₹{payment.amount}"],
        ["Date:", payment.paid_at.strftime("%d %b %Y")],
    ]

    table = Table(payment_details, colWidths=[150, 350])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, -1), colors.lightgrey),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))

    elements.append(table)
    elements.append(Spacer(1, 25))

    # Footer
    elements.append(Paragraph(
        "<b>Thank you for your payment!</b><br/>"
        "If you have any questions, email support@swiftshop.com",
        styles["Normal"]
    ))

    # Build PDF
    pdf.build(elements)
    pdf_bytes = buffer.getvalue()
    buffer.close()

    # Send email
    email = EmailMessage(
        subject=f"Payment Receipt for Order #{order.id}",
        body="Your payment was successful. Receipt attached.",
        to=[order.user.email]
    )

    email.attach(f"payment-receipt-{order.id}.pdf", pdf_bytes, "application/pdf")
    email.send()

    return "Payment receipt sent"
