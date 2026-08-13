# Sync-UVCE — Architecture

## 1. System Overview
Client-server architecture:
- Frontend: React (talks to backend over HTTP/REST)
- Backend: FastAPI (Python)
- Database: PostgreSQL

## 2. Database Schema

### users
| field | type | notes |
|---|---|---|
| id | UUID/int, PK | |
| name | string | |
| email | string, unique | must end in college domain |
| password_hash | string | bcrypt |
| role | enum: student, admin | default student |
| is_verified | boolean | set true after OTP |
| created_at | timestamp | |

### items (Marketplace)
| field | type | notes |
|---|---|---|
| id | PK | |
| seller_id | FK → users.id | |
| title | string | |
| description | text | |
| price | decimal | |
| category | string | books, notes, equipment, calculator, other |
| condition | string | new, used-good, used-fair |
| image_path | string, nullable | |
| status | enum: available, sold | default available |
| created_at | timestamp | |

### lostfound_items
| field | type | notes |
|---|---|---|
| id | PK | |
| reporter_id | FK → users.id | |
| type | enum: lost, found | one table, not two — filter by this field |
| title | string | |
| description | text | |
| image_path | string, nullable | |
| location | string | |
| event_date | date | date lost/found, not created_at |
| status | enum: open, resolved | default open |
| created_at | timestamp | |

### posts (Complaints + Queries/Suggestions merged)
| field | type | notes |
|---|---|---|
| id | PK | |
| author_id | FK → users.id, nullable | stored, but never exposed publicly (see §4) |
| post_type | enum: question, suggestion, complaint | |
| is_anonymous | boolean | |
| category | string | academic, facilities, harassment, food, other |
| title | string | |
| description | text | |
| status | enum: open, reviewed, resolved | complaints only |
| created_at | timestamp | |

### replies
| field | type | notes |
|---|---|---|
| id | PK | |
| post_id | FK → posts.id | |
| author_id | FK → users.id | replies are never anonymous |
| content | text | |
| created_at | timestamp | |

## 3. Locked Design Decisions
- **Lost & Found:** one table (`lostfound_items`) with a `type` field (lost/found), not two separate tables.
- **Complaints:** pseudonymous. `author_id` is always stored in the database but never returned in any API response visible to students. Identity is withheld from other students and the public API, not from the database itself.
- **Image uploads:** one shared utility (`backend/app/shared/uploads.py`), used by both Marketplace and Lost & Found, instead of two separate implementations.

## 4. Auth Contract
- `get_current_user()` — a FastAPI dependency defined once in `auth/dependencies.py`, imported by every protected route in every module.
- Returns a `User` object with at minimum `.id`, `.role`, `.email`, or raises 401 if not authenticated.
- Ownership check pattern, used identically everywhere: `if resource.owner_id != current_user.id: raise 403`
- Admin check pattern: `if current_user.role != "admin": raise 403`

## 5. API Contract

**Auth:** `POST /auth/register`, `POST /auth/verify-otp`, `POST /auth/login`, `GET /auth/me`

**Marketplace:** `POST /marketplace/items`, `GET /marketplace/items` (query: category, search), `GET /marketplace/items/{id}`, `PATCH /marketplace/items/{id}` (owner-only), `DELETE /marketplace/items/{id}` (owner-only)

**Lost & Found:** `POST /lostfound/items`, `GET /lostfound/items` (query: type, category), `GET /lostfound/items/{id}`, `PATCH /lostfound/items/{id}` (owner-only, resolve)

**Posts:** `POST /posts`, `GET /posts` (query: post_type), `GET /posts/{id}`, `POST /posts/{id}/replies`, `PATCH /posts/{id}/status` (admin-only, complaints)

**Shared:** `POST /uploads/image` → returns `image_path`

## 6. Folder Structure
See repo root — `backend/app/<module>/` per module, `frontend/src/{components,pages,api}/`.

## 7. Branching Workflow
- `main` — stable, PR + approval required
- `dev` — integration branch, all feature branches merge here first
- Feature branches: `module-feature-name` (e.g. `marketplace-item-crud`)