# 🐛 Bugs to Fix - Priority List

## 🔴 High Priority

### 1. Multiple Firebase Initializations
**Files**: 
- `src/lib/firebase.ts`
- `src/lib/firestore.ts` 
- `src/context/AuthContext.tsx`
- `src/lib/storage.ts`

**Problem**: Firebase app is being initialized in multiple places, which can cause conflicts and errors.

**Solution**: 
- Use single Firebase initialization from `src/lib/firebase.ts`
- Import `getFirebaseApp()` from there in all other files
- Remove duplicate initialization code

**Impact**: High - Can cause runtime errors and unexpected behavior

---

## 🟡 Medium Priority

### 2. Firestore Timestamp to Date Conversion
**File**: `src/lib/firestore.ts`

**Problem**: Firestore returns Timestamp objects, but TypeScript types expect Date objects. This can cause type mismatches and display issues.

**Solution**: 
- Convert Firestore Timestamps to JavaScript Dates when reading documents
- Add helper function: `convertTimestamps(data: any): any`

**Impact**: Medium - Date fields may not display correctly

### 3. Missing Environment Variables Validation
**File**: `src/lib/firebase.ts`

**Problem**: No validation that all required Firebase environment variables are present. App may fail silently.

**Solution**:
```typescript
function validateFirebaseConfig() {
  const required = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID',
  ];
  
  const missing = required.filter(key => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing Firebase config: ${missing.join(', ')}`);
  }
}
```

**Impact**: Medium - App may fail in production if env vars are missing

### 4. Project Slug Uniqueness Not Enforced
**Files**: 
- `src/app/admin/projects/page.tsx` (likely)
- `src/lib/firestore.ts` - `addProject()` / `updateProject()`

**Problem**: No validation that project slugs are unique. Duplicate slugs can cause routing conflicts.

**Solution**:
- Add `checkSlugExists(slug: string, excludeId?: string)` function
- Validate before saving project
- Show error if slug already exists

**Impact**: Medium - Can cause routing issues and 404 errors

### 5. Form Validation Missing
**Files**: All admin form pages

**Problem**: Forms may not have comprehensive client-side validation using React Hook Form.

**Solution**:
- Add validation schemas (using zod or yup)
- Validate required fields
- Validate email formats
- Validate URL formats
- Validate date ranges

**Impact**: Medium - Bad data could be saved to database

---

## 🟢 Low Priority

### 6. Image Upload Path Conflicts
**File**: `src/lib/storage.ts`

**Problem**: Profile images use fixed paths (`avatar.{ext}`), which overwrites previous uploads. No versioning.

**Solution**: 
- Use unique filenames: `avatar-${timestamp}.${ext}`
- Or keep fixed path but delete old file first

**Impact**: Low - Works but could be improved

### 7. Storage URL Parsing
**File**: `src/lib/storage.ts` - `deleteFile()` function

**Problem**: URL parsing for Firebase Storage URLs may not handle all URL formats correctly.

**Solution**: Improve URL parsing logic to handle various Firebase Storage URL formats.

**Impact**: Low - Delete may fail for some edge cases

### 8. Missing Loading States
**Files**: Admin pages

**Problem**: Some operations may not show loading states, causing poor UX.

**Solution**: Add loading spinners/indicators for all async operations.

**Impact**: Low - UX improvement

### 9. Image Optimization Missing
**File**: `src/lib/storage.ts`

**Problem**: Images are uploaded without optimization, which can cause slow loading and high storage costs.

**Solution**: 
- Add image compression before upload
- Resize large images
- Convert to WebP format

**Impact**: Low - Performance and cost optimization

### 10. Mock Data Always Falls Back
**File**: `src/app/page.tsx`

**Problem**: Always falls back to mock data on error, which may hide production issues.

**Solution**: 
- Only use mock data in development
- Show error message in production
- Log errors properly

**Impact**: Low - May mask production issues

---

## 📋 Quick Fix Checklist

- [ ] Fix Firebase initialization duplication (High)
- [ ] Add Timestamp to Date conversion (Medium)
- [ ] Add environment variable validation (Medium)
- [ ] Add slug uniqueness check (Medium)
- [ ] Add form validation schemas (Medium)
- [ ] Improve image upload paths (Low)
- [ ] Fix storage URL parsing (Low)
- [ ] Add loading states (Low)
- [ ] Add image optimization (Low)
- [ ] Improve error handling (Low)

---

## 🔍 Testing After Fixes

After fixing bugs, test:
1. ✅ Firebase initialization works without errors
2. ✅ Dates display correctly in all sections
3. ✅ App fails gracefully with missing env vars
4. ✅ Cannot create duplicate project slugs
5. ✅ Forms validate all inputs
6. ✅ Image uploads work correctly
7. ✅ File deletion works for all URL formats
8. ✅ Loading states show during operations
9. ✅ Images are optimized before upload
10. ✅ Errors are properly logged and displayed

---

**Next Steps**: Start with High Priority bugs, then move to Medium, then Low priority items.
