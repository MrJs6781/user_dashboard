# 1. استفاده از یک ایمیج پایه نود برای ساخت و توسعه
FROM node:18 AS build

# 2. تنظیم دایرکتوری کاری در کانتینر
WORKDIR /app

# 3. کپی کردن فایل‌های package.json و package-lock.json برای نصب وابستگی‌ها
COPY package*.json ./

# 4. نصب وابستگی‌ها
RUN npm install

# 5. کپی کردن تمامی فایل‌های پروژه به دایرکتوری کاری
COPY . .

# 6. باز کردن پورت 5173 برای توسعه
EXPOSE 5173

# 7. اجرای دستور start در حالت توسعه
CMD ["npm", "run", "dev", "--", "--host"]
