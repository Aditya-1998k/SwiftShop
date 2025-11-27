
import random
from django.contrib.auth.models import User
from django.utils.text import slugify
from faker import Faker

from product.models import Category, Product, ProductImages, Review
from users.models import Profile, Address
from cart.models import Cart, CartItem
from orders.models import Order, OrderItem
from payments.models import Payment, Coupon, CouponUsage

fake = Faker()


# -----------------------
# 1. Create Users
# -----------------------
def seed_users(n=10):
    users = []

    for i in range(n):
        username = f"user{i}"
        email = f"user{i}@example.com"
        password = "test123"

        user, created = User.objects.get_or_create(
            username=username,
            defaults={"email": email}
        )
        user.set_password(password)
        user.save()
        users.append(user)

        # Profile
        Profile.objects.get_or_create(
            user=user,
            defaults={
                "phone": fake.phone_number(),
                "gender": "M",
                "address": fake.street_address(),
            }
        )

        # Address
        Address.objects.get_or_create(
            user=user,
            defaults={
                "name": "HOME",
                "phone": fake.phone_number(),
                "line1": fake.street_address(),
                "line2": fake.secondary_address(),
                "city": fake.city(),
                "state": fake.state(),
                "pincode": fake.postcode(),
                "is_default": True
            }
        )

    print(f"Created {n} users")
    return users


# -----------------------
# 2. Create Categories
# -----------------------
def seed_categories():
    names = [
        "Mobile Phones", "Laptops", "Headphones", "Smart Watches", "Shoes",
        "T-Shirts", "TV & Appliances", "Home Decor", "Groceries", "Books"
    ]
    categories = []

    for name in names:
        cat, _ = Category.objects.get_or_create(
            name=name,
            slug=slugify(name)
        )
        categories.append(cat)

    print("Created 10 categories")
    return categories


# -----------------------
# 3. Create Products
# -----------------------
def seed_products(categories, count=30):
    products = []

    for i in range(count):
        name = fake.word().capitalize() + " " + fake.word().capitalize()
        category = random.choice(categories)

        product = Product.objects.create(
            name=name,
            slug=slugify(name) + f"-{i}",
            description=fake.text(),
            category=category,
            brand=random.choice(["Apple", "Samsung", "Nike", "Adidas", "Sony"]),
        )

        # Add product images
        for j in range(random.randint(2, 3)):
            ProductImages.objects.create(
                product=product,
                image_url=f"https://picsum.photos/400/40{j}",
                is_primary=(j == 0)
            )

        products.append(product)

    print(f"Created {count} products with images")
    return products


# -----------------------
# 4. Create Reviews
# -----------------------
def seed_reviews(products, users):
    for product in products:
        for user in random.sample(users, random.randint(1, 5)):
            Review.objects.create(
                product=product,
                user=user,
                rating=random.randint(3, 5),
                review_text=fake.text()
            )
    print("Added reviews")


# -----------------------
# 5. Create Carts + Cart Items
# -----------------------
def seed_carts(users, products):
    for user in users:
        if random.choice([True, False]):
            cart = Cart.objects.create(user=user)
            for p in random.sample(products, random.randint(1, 4)):
                CartItem.objects.create(
                    cart=cart,
                    product=p,
                    quantity=random.randint(1, 3),
                    price_at_time=random.randint(300, 3000)
                )
    print("Created carts with items")


# -----------------------
# 6. Create Orders + Items
# -----------------------
def seed_orders(users, products):
    for user in users:
        if random.choice([True, False]):
            address = Address.objects.filter(user=user).first()
            order = Order.objects.create(
                user=user,
                address=address,
                subtotal=2000,
                discount=100,
                total_amount=1900,
                status="PAID",
                payment_status="PAID",
            )

            chosen_products = random.sample(products, random.randint(1, 3))

            for p in chosen_products:
                qty = random.randint(1, 3)
                OrderItem.objects.create(
                    order=order,
                    product=p,
                    quantity=qty,
                    price=500,
                    total=500 * qty
                )

            # Payment
            Payment.objects.create(
                order=order,
                payment_method="UPI",
                transaction_id=f"TXN{random.randint(1000,9999)}",
                amount=order.total_amount,
                status="PAID",
            )

    print("Created orders + payments")


# -----------------------
# 7. Create Coupons
# -----------------------
def seed_coupons():
    coupon, _ = Coupon.objects.get_or_create(
        code="WELCOME100",
        discount_type="FLAT",
        value=100,
        min_purchase_amount=500,
        usage_limit=100,
        valid_from=fake.date_time_this_year(),
        valid_to=fake.future_datetime(),
    )
    print("Created coupons")


# -----------------------
# Run Seeder
# -----------------------
def run():
    print("🔥 Seeding Database...")

    users = seed_users()
    categories = seed_categories()
    products = seed_products(categories)
    seed_reviews(products, users)
    seed_carts(users, products)
    seed_orders(users, products)
    seed_coupons()

    print("🎉 Seeding completed successfully!")


run()
