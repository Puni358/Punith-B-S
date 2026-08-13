# Student Market — Campus Marketplace

**Student Market** is a modern, student-to-student campus marketplace built with **React**, **Vite**, **Tailwind CSS**, and **Firebase**. Students can log in to buy and sell textbooks, electronics, dorm furniture, stationery, clothing, and accessories with fellow students.

---

## 🚀 Features (Version 1)

* **Campus Visual Identity**: Retro paper dot-grid styling with Plus Jakarta Sans body typography and JetBrains Mono headings & sharp borders.
* **Authentication**: Email/Password Sign Up & Login, Google Sign-In, Password Reset, and persistent session state.
* **Marketplace Listings**: Browse all listings with title keyword search and category filtering (Books, Electronics, Furniture, Stationery, Clothing, Accessories, Other).
* **Listing Details**: Detailed view with multi-image gallery support, condition badges, price formatting, and seller profile.
* **Sell Items**: Authenticated creation of listings with photo uploads, category selection, price input, and condition tags.
* **My Listings Dashboard**: View, edit, or delete items you have posted for sale with safety deletion confirmation.
* **Graceful Development Fallback**: If Firebase credentials are not yet set, the frontend operates seamlessly in Development Demo Mode with persistent local data so all flows work out of the box.

---

## 🛠️ Step-by-Step Firebase Setup Guide

Follow these simple steps to connect your own Google Firebase project to Student Market:

### 1. Create a Firebase Project & Register a Web App
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** (or select an existing project) and follow the prompts.
3. In your project overview page, click the **Web icon (`</>`)** to add a new Web Application.
4. Enter `Student Market` as the app nickname and click **Register app**.
5. Copy the `firebaseConfig` keys provided in the setup screen.

### 2. Enable Authentication Providers
1. In the left navigation menu, go to **Build > Authentication**.
2. Click **Get Started**.
3. Under the **Sign-in method** tab:
   * **Email/Password**: Click Email/Password, toggle **Enable**, and click **Save**.
   * **Google**: Click Google, toggle **Enable**, select your Project support email, and click **Save**.

### 3. Create a Cloud Firestore Database
1. In the left navigation menu, go to **Build > Firestore Database**.
2. Click **Create database**.
3. Select a database location close to your users and start in **Production mode** or **Test mode**.
4. Click **Enable**.

### 4. Create Firebase Storage
1. In the left navigation menu, go to **Build > Storage**.
2. Click **Get Started**.
3. Accept the default security rules and location settings, then click **Done**.

### 5. Configure Environment Variables
Create a file named `.env` in the root of the project (or set variables in your hosting provider) with your Firebase credentials from Step 1:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 6. Configure Firestore Security Rules
In the Firebase Console under **Firestore Database > Rules**, paste the rules from `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isSignedIn() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }

    function isSeller(sellerId) {
      return isSignedIn() && request.auth.uid == sellerId;
    }

    match /{document=**} {
      allow read, write: if false;
    }

    match /users/{userId} {
      allow read: if isSignedIn();
      allow create, update: if isOwner(userId);
      allow delete: if isOwner(userId);
    }

    match /listings/{listingId} {
      allow read: if true;
      allow create: if isSignedIn()
        && request.resource.data.sellerId == request.auth.uid;
      allow update: if isSeller(resource.data.sellerId);
      allow delete: if isSeller(resource.data.sellerId);
    }
  }
}
```
Click **Publish**.

### 7. Configure Storage Security Rules
In the Firebase Console under **Storage > Rules**, paste the rules from `storage.rules`:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /listings/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```
Click **Publish**.

---

## 💻 Running the Application Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
├── .env.example            # Environment variables template
├── README.md               # Firebase setup & usage instructions
├── firebase-blueprint.json # Data schema blueprint
├── firestore.rules         # Security rules for Firestore
├── storage.rules           # Security rules for Firebase Storage
├── package.json
├── src/
│   ├── components/         # Reusable UI components (Navbar, Footer, ListingCard, Loading, etc.)
│   ├── context/            # AuthContext & AuthProvider
│   ├── firebase/           # Firebase initialization & SDK exports
│   ├── pages/              # App pages (Home, Browse, ListingDetails, Sell, MyListings, Login, Signup)
│   ├── services/           # Business logic & Firebase services (auth, listing, user, mockData)
│   ├── types.ts            # Shared TypeScript interfaces
│   ├── App.tsx             # Main routing setup
│   ├── main.tsx            # React DOM entry
│   └── index.css           # Custom retro paper styling and fonts
```

---

## 🔮 Future Architecture Roadmap (Version 2+)

The codebase is structured to easily support upcoming features without restructuring:
* In-app buyer/seller real-time messaging
* User ratings & seller trust reviews
* Report/flagging system for campus moderation
* Saved favorites & wishlist
* Campus location pickup selection
