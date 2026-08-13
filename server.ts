import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import jwt from "jsonwebtoken";
import { createServer as createViteServer } from "vite";

const JWT_SECRET = process.env.JWT_SECRET || "uvce-student-portal-jwt-secret-2026";
const PORT = 3000;

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  is_verified: boolean;
  created_at: string;
}

interface OtpRecord {
  email: string;
  code: string;
  expires_at: number;
  is_used: boolean;
}

interface Item {
  id: number;
  seller_id: number;
  title: string;
  description: string | null;
  price: number;
  pricing_type: string;
  category: string;
  image_path: string | null;
  status: string;
  created_at: string;
  expires_at: string;
}

// In-memory data structures
const users: User[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "student@uvce.ac.in",
    role: "student",
    is_verified: true,
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const otps: OtpRecord[] = [];

const items: Item[] = [
  {
    id: 1,
    seller_id: 1,
    title: "B.S. Grewal Higher Engineering Mathematics (44th Ed)",
    description: "Standard math textbook for 1st-4th semester UVCE engineering curriculum. Clean pages, minimal pencil markings.",
    price: 350,
    pricing_type: "Fixed Price",
    category: "books",
    image_path: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    status: "available",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    expires_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    seller_id: 1,
    title: "Casio FX-991EX ClassWiz Scientific Calculator",
    description: "Solar powered matrix & calculus calculator. Essential for VTU/UVCE semester exams. Fully working condition with hard case.",
    price: 850,
    pricing_type: "Negotiable",
    category: "calculator",
    image_path: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=600&q=80",
    status: "available",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    expires_at: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    seller_id: 1,
    title: "White Chemistry Lab Coat & Protective Goggles (Size L)",
    description: "100% Cotton lab coat required for 1st year Chemistry/Physics labs. Washed and sanitized.",
    price: 200,
    pricing_type: "Fixed Price",
    category: "equipment",
    image_path: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=600&q=80",
    status: "available",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    expires_at: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

let userIdCounter = 1;
let itemIdCounter = 3;

// Helper: Authenticate JWT Token
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ detail: "Authentication token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { sub: string; role: string };
    const user = users.find((u) => String(u.id) === decoded.sub);
    if (!user) {
      return res.status(401).json({ detail: "User account not found" });
    }
    (req as any).user = user;
    next();
  } catch (err) {
    return res.status(401).json({ detail: "Session expired. Please log in again." });
  }
}

async function startServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // ---------------- AUTH ROUTES ----------------

  // Register
  app.post("/auth/register", (req: Request, res: Response) => {
    const { name, email } = req.body || {};
    if (!email || !email.trim()) {
      return res.status(400).json({ detail: "Email is required" });
    }
    const emailClean = email.trim().toLowerCase();
    const nameClean = (name || "").trim();

    const existing = users.find((u) => u.email === emailClean);
    if (existing) {
      return res.status(400).json({ detail: "Email is already registered" });
    }

    userIdCounter++;
    const newUser: User = {
      id: userIdCounter,
      name: nameClean || "UVCE Student",
      email: emailClean,
      role: "student",
      is_verified: false,
      created_at: new Date().toISOString(),
    };

    users.push(newUser);
    return res.status(201).json({ message: "User registered successfully" });
  });

  // Request OTP
  app.post("/auth/request-otp", (req: Request, res: Response) => {
    const { email } = req.body || {};
    if (!email || !email.trim()) {
      return res.status(400).json({ detail: "Email is required" });
    }
    const emailClean = email.trim().toLowerCase();

    const user = users.find((u) => u.email === emailClean);
    if (!user) {
      return res.status(400).json({ detail: "No account found for this email. Please register first." });
    }

    // Invalidate previous OTPs
    otps.forEach((o) => {
      if (o.email === emailClean) o.is_used = true;
    });

    // Generate 6-digit OTP code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires_at = Date.now() + 5 * 60 * 1000; // 5 mins

    otps.push({
      email: emailClean,
      code,
      expires_at,
      is_used: false,
    });

    console.log(`\n==============================================`);
    console.log(`[PASSCODE/OTP] Code for ${emailClean}: ${code}`);
    console.log(`==============================================\n`);

    return res.json({ message: "OTP sent successfully to your email" });
  });

  // Verify OTP
  app.post("/auth/verify-otp", (req: Request, res: Response) => {
    const { email, code } = req.body || {};
    if (!email || !code) {
      return res.status(400).json({ detail: "Email and code are required" });
    }
    const emailClean = email.trim().toLowerCase();
    const codeClean = String(code).trim();

    const user = users.find((u) => u.email === emailClean);
    const otpRecord = otps.find(
      (o) => o.email === emailClean && o.code === codeClean && !o.is_used && o.expires_at > Date.now()
    );

    if (!user || !otpRecord) {
      return res.status(400).json({ detail: "Invalid or expired code" });
    }

    otpRecord.is_used = true;
    user.is_verified = true;

    const access_token = jwt.sign(
      { sub: String(user.id), role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.json({ access_token, token_type: "bearer" });
  });

  // Me profile
  app.get("/auth/me", authenticateToken, (req: Request, res: Response) => {
    const user: User = (req as any).user;
    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      is_verified: user.is_verified,
      created_at: user.created_at,
    });
  });

  // ---------------- MARKETPLACE ROUTES ----------------

  // Get Items
  app.get("/marketplace/items", (req: Request, res: Response) => {
    const { category, search } = req.query as { category?: string; search?: string };
    const now = Date.now();

    let result = items.filter((item) => {
      const isAvailable = item.status === "available";
      const notExpired = new Date(item.expires_at).getTime() > now;
      if (!isAvailable || !notExpired) return false;

      if (category && category.toLowerCase() !== "all") {
        if (item.category.toLowerCase() !== category.trim().toLowerCase()) {
          return false;
        }
      }

      if (search && search.trim()) {
        const q = search.trim().toLowerCase();
        const titleMatch = item.title.toLowerCase().includes(q);
        const descMatch = item.description ? item.description.toLowerCase().includes(q) : false;
        if (!titleMatch && !descMatch) return false;
      }

      return true;
    });

    result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    const response = result.map((item) => {
      const seller = users.find((u) => u.id === item.seller_id);
      return {
        id: item.id,
        seller_id: item.seller_id,
        seller_name: seller ? seller.name : "UVCE Student",
        title: item.title,
        description: item.description,
        price: item.price,
        pricing_type: item.pricing_type,
        category: item.category,
        image_path: item.image_path,
        status: item.status,
        created_at: item.created_at,
        expires_at: item.expires_at,
      };
    });

    return res.json(response);
  });

  // Get Single Item
  app.get("/marketplace/items/:id", (req: Request, res: Response) => {
    const itemId = Number(req.params.id);
    const item = items.find((i) => i.id === itemId);

    if (!item) {
      return res.status(404).json({ detail: "Marketplace listing not found" });
    }

    const seller = users.find((u) => u.id === item.seller_id);
    return res.json({
      id: item.id,
      seller_id: item.seller_id,
      seller_name: seller ? seller.name : "UVCE Student",
      title: item.title,
      description: item.description,
      price: item.price,
      pricing_type: item.pricing_type,
      category: item.category,
      image_path: item.image_path,
      status: item.status,
      created_at: item.created_at,
      expires_at: item.expires_at,
    });
  });

  // Create Item
  app.post("/marketplace/items", authenticateToken, (req: Request, res: Response) => {
    const user: User = (req as any).user;
    const { title, description, price, pricing_type, category, image_path } = req.body || {};

    if (!title || price === undefined || !category) {
      return res.status(400).json({ detail: "Title, price, and category are required" });
    }

    itemIdCounter++;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const newItem: Item = {
      id: itemIdCounter,
      seller_id: user.id,
      title: String(title).trim(),
      description: description ? String(description).trim() : null,
      price: Number(price),
      pricing_type: pricing_type || "Fixed Price",
      category: String(category).trim().toLowerCase(),
      image_path: image_path || null,
      status: "available",
      created_at: now.toISOString(),
      expires_at: expiresAt.toISOString(),
    };

    items.push(newItem);

    return res.status(201).json({
      id: newItem.id,
      seller_id: newItem.seller_id,
      seller_name: user.name,
      title: newItem.title,
      description: newItem.description,
      price: newItem.price,
      pricing_type: newItem.pricing_type,
      category: newItem.category,
      image_path: newItem.image_path,
      status: newItem.status,
      created_at: newItem.created_at,
      expires_at: newItem.expires_at,
    });
  });

  // Delete Item
  app.delete("/marketplace/items/:id", authenticateToken, (req: Request, res: Response) => {
    const user: User = (req as any).user;
    const itemId = Number(req.params.id);
    const itemIndex = items.findIndex((i) => i.id === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ detail: "Marketplace listing not found" });
    }

    const item = items[itemIndex];
    if (item.seller_id !== user.id) {
      return res.status(403).json({ detail: "You are not authorized to delete this listing" });
    }

    items.splice(itemIndex, 1);
    return res.status(204).send();
  });

  // Extend Item Expiry
  app.patch("/marketplace/items/:id/extend", authenticateToken, (req: Request, res: Response) => {
    const user: User = (req as any).user;
    const itemId = Number(req.params.id);
    const item = items.find((i) => i.id === itemId);

    if (!item) {
      return res.status(404).json({ detail: "Marketplace listing not found" });
    }

    if (item.seller_id !== user.id) {
      return res.status(403).json({ detail: "You are not authorized to modify this listing" });
    }

    const currentExpiry = new Date(item.expires_at).getTime();
    const now = Date.now();
    if (item.status === "expired" || currentExpiry <= now) {
      return res.status(400).json({ detail: "Cannot extend an expired listing" });
    }

    const baseTime = currentExpiry > now ? currentExpiry : now;
    item.expires_at = new Date(baseTime + 5 * 24 * 60 * 60 * 1000).toISOString();

    return res.json({
      id: item.id,
      seller_id: item.seller_id,
      seller_name: user.name,
      title: item.title,
      description: item.description,
      price: item.price,
      pricing_type: item.pricing_type,
      category: item.category,
      image_path: item.image_path,
      status: item.status,
      created_at: item.created_at,
      expires_at: item.expires_at,
    });
  });

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Vite or Static file middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Sync-UVCE server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
