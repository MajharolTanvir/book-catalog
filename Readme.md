# Book-catalog

1. Github Private Repository Link - https://github.com/MajharolTanvir/book-catalog
2. Deployed Live Link - https://book-catalog-ten-iota.vercel.app/api/v1/
3. Database url - postgresql://postgres:NtTmKUq8UlY7areE@db.gitfgurgbwvjoffrcisj.supabase.co:5432/postgres?schema=public
4. Application Routes:
    - User
        - api/v1/auth/signup (POST)
        - api/v1/users (GET)
        - api/v1/users/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database
        - api/v1/users/6177a5b87d32123f08d2f5d4 (PATCH)
        - api/v1/users/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database
        - api/v1/profile (GET)
    - Category
        - api/v1/categories/create-category (POST)
        - api/v1/categories (GET)
        - api/v1/categories/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database
        - api/v1/categories/6177a5b87d32123f08d2f5d4 (PATCH)
        - api/v1/categories/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database
    - Books
        - api/v1/books/create-book (POST)
        - api/v1/books (GET)
        - api/v1/books/:categoryId/category (GET)
        - api/v1/books/:id (GET)
        - api/v1/books/:id (PATCH)
        - api/v1/books/:id (DELETE)
    - Orders
        - api/v1/orders/create-order (POST)
        - api/v1/orders (GET)
        - api/v1/orders/:orderId (GET)