# NEXT APP 15 - React + TypeScript + Material UI + Tailwind CSS

## 📂 Application Structure

The structure of this application separates components and features into clear modules to improve readability, maintainability, and scalability.

### Example Module Structure: `auth/`

```plaintext
auth/
├── login/
│   ├── __tests__/
│   │   └── Login.test.tsx
│   ├── api/
│   │   └── loginApi.ts
│   ├── hooks/
│   │   └── useLogin.ts
│   ├── index.ts
│   ├── login.data.ts
│   ├── login.type.ts
│   ├── Login.tsx
│   └── Login.view.tsx
└── index.ts
```

### Example Simple Component Structure: `card/`

```plaintext
card/
├── card.ts
├── card.data.ts
├── card.type.ts
├── Card.tsx
└── Card.view.tsx
```

---

## 🛠️ Module Creation Guide

### Basic Module Structure

```plaintext
src/
├── app/
│   └── backoffice/
│       └── master-data/
│  
│ 
└── backoffice/
    └── modules/
        └── master-data/
            └── [user]/
                ├── api/
                │   └── userApi.ts
                ├── components/
                │   └── [component-files]
                ├── hooks/
                │   └── [hook-files] 
                ├── User.tsx
                ├── User.view.tsx
                └── user.type.ts
```
