# Firestore Security Rules for Contact Form

## Steps to Fix Permission Error:

1. Go to Firebase Console: https://console.firebase.google.com/project/jaihindstore-daa10/firestore/rules

2. Replace your current rules with these:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read and write to contacts collection
    match /contacts/{document=**} {
      allow read, write: if true;
    }
    
    // Deny all other access by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

3. Click "Publish" button

4. Wait a few seconds for rules to propagate

5. Test your contact form again!

## ⚠️ SECURITY WARNING:

**The rules above (`allow read, write: if true`) means:**
- ❌ **ANYONE can read ALL your data** (all collections, all documents)
- ❌ **ANYONE can write/modify/delete ALL your data**
- ❌ **This is INSECURE and should NOT be used in production!**

## ✅ RECOMMENDED: Secure Rules (Use This Instead):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only allow writes to contacts collection (no one can read it)
    match /contacts/{document=**} {
      // Allow creating new contact messages (no reading allowed)
      allow create: if request.resource.data.keys().hasAll(['name', 'email', 'message', 'timestamp'])
                   && request.resource.data.name is string
                   && request.resource.data.email is string
                   && request.resource.data.message is string;
      
      // Prevent reading, updating, or deleting contacts
      allow read, update, delete: if false;
    }
    
    // Deny access to all other collections
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## 🔒 Even More Secure (Only You Can Read Contacts):

If you want only authenticated admin users to read contacts:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to create contact messages
    match /contacts/{document=**} {
      allow create: if request.resource.data.keys().hasAll(['name', 'email', 'message', 'timestamp']);
      
      // Only authenticated admins can read contacts
      allow read: if request.auth != null && request.auth.token.admin == true;
      
      // No one can update or delete
      allow update, delete: if false;
    }
    
    // Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## 📝 Summary:

- **Current (insecure)**: Anyone can read/write everything
- **Recommended (secure)**: Only allows creating contact messages, no reading
- **Most secure**: Only admins can read, public can only create

