# DaanSetu - Team Quick Reference Guide

**Last Updated:** April 2026  
**Team:** M1 (Backend) + M2 (Frontend)  
**Project Duration:** 8 Weeks

---

## 🎯 YOUR ROLE AT A GLANCE

### M1 - Backend Engineer (244 hours)
**"The API Architect"**
- ✅ Design & build all backend APIs
- ✅ Database schema & optimization
- ✅ Authentication & security
- ✅ Integration with 3rd party services
- ✅ Performance & scalability
- ✅ DevOps & deployment

### M2 - Frontend Engineer (206 hours)
**"The Experience Builder"**
- ✅ Build beautiful React components
- ✅ Responsive & intuitive UI
- ✅ API integration
- ✅ User experience optimization
- ✅ Component testing
- ✅ Accessibility compliance

---

## 📋 WEEK-BY-WEEK ROADMAP

### Week 1-2: Authentication (56 hours each)
| M1 | M2 |
|----|----|
| ✨ User model upgrade (8h) | 🎨 Login/Register UI (12h) |
| 📧 Email verification (12h) | ✉️ Email verify page (8h) |
| 🔐 Password reset (10h) | 🔄 Password reset flow (10h) |
| 🛡️ 2FA setup (15h) | 🔐 2FA UI (12h) |
| 👨‍💼 Admin management (16h) | |

**🎯 Outcome:** Full authentication system ready

---

### Week 3-4: Donations (86 hours each)
| M1 | M2 |
|----|----|
| 📦 Donation model (8h) | 📸 Create donation form (16h) |
| ✏️ CRUD operations (16h) | 🔍 Browse & search (14h) |
| 🤝 Request system (14h) | 📄 Detail page (12h) |
| 📍 Tracking (12h) | 📨 Request management (12h) |
| ⭐ Reviews (10h) | 🗺️ Tracking page (14h) |
| 🔎 Search/filter (14h) | ⭐ Reviews UI (10h) |

**🎯 Outcome:** Complete donation workflow

---

### Week 5: Organizations (36 hours each)
| M1 | M2 |
|----|----|
| ✔️ Org verification (12h) | 📝 Verification form (10h) |
| 📊 Dashboard API (14h) | 📈 Dashboard UI (12h) |
| 👥 Team management (10h) | 👥 Team UI (10h) |

**🎯 Outcome:** NGO/Organization features live

---

### Week 6: Notifications (50 hours each)
| M1 | M2 |
|----|----|
| 🔔 Notification service (14h) | 🔔 Notification center (10h) |
| 📧 Email notifications (12h) | 💬 Chat UI (14h) |
| 📱 SMS notifications (8h) | ⚙️ Preferences (8h) |
| 💬 Chat system (16h) | |

**🎯 Outcome:** Real-time notifications and messaging

---

### Week 7: Security (38 hours each)
| M1 | M2 |
|----|----|
| 🛡️ Input validation (10h) | 🔒 Security best practices (8h) |
| 🔐 Data encryption (8h) | |
| 🔑 API security (8h) | |
| 📊 Audit logging (12h) | |

**🎯 Outcome:** Enterprise-grade security

---

### Week 8: Testing & Launch (28 hours each)
| M1 | M2 |
|----|----|
| ✅ Unit tests (16h) | ✅ Component tests (12h) |
| ✅ Integration tests (12h) | 🧪 E2E tests (10h) |
| 🚀 Deploy | 🚀 Deploy |

**🎯 Outcome:** Production ready!

---

## 🔗 KEY DEPENDENCIES

```
M1 Task → Blocks → M2 Task
═════════════════════════════
1.1.1 (User Model) → 1.2.1 (Register UI)
1.1.2 (Email) → 1.2.2 (Email Page)
1.1.3 (Password Reset) → 1.2.3 (Reset UI)
1.1.4 (2FA) → 1.2.5 (2FA UI)
2.1.1 (Donation Model) → 2.2.1 (Donation Form)
2.1.2 (CRUD Ops) → 2.2.2 (Browse)
2.1.3 (Requests) → 2.2.4 (Request UI)
2.1.4 (Tracking) → 2.2.5 (Tracking UI)
2.1.5 (Reviews) → 2.2.6 (Reviews UI)
```

**⚠️ Critical:** M1 must complete user model before M2 starts registration UI!

---

## 💻 TECH STACK CHEAT SHEET

### Backend (M1)
```
Node.js 18+ / Express.js 5.x
├─ Database: MongoDB 6+ (Atlas)
├─ Auth: JWT + bcryptjs
├─ Real-time: Socket.io
├─ Testing: Jest + Supertest
├─ Email: Nodemailer / SendGrid
└─ File Upload: AWS S3 / Cloudinary
```

**Key Commands:**
```bash
npm run dev          # Start dev server
npm run start        # Start production
npm test             # Run tests
npm run lint         # Lint code
```

### Frontend (M2)
```
React 19.x
├─ Build: Vite 7.x
├─ Routing: React Router 7.x
├─ HTTP: Axios
├─ State: React Context (or Zustand)
├─ Testing: Vitest + React Testing Library
├─ E2E: Cypress
└─ Styling: CSS Modules / Tailwind
```

**Key Commands:**
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview build
npm run test         # Run tests
npm run lint         # Lint code
```

---

## 📊 SUCCESS METRICS

### M1 Backend
- [ ] All 24 tasks completed on time
- [ ] API response time < 200ms (p95)
- [ ] 80%+ test coverage
- [ ] Zero critical security issues
- [ ] Database optimized with indexes
- [ ] Comprehensive documentation

### M2 Frontend
- [ ] All 20 tasks completed on time
- [ ] Lighthouse score > 90
- [ ] 70%+ test coverage
- [ ] All components responsive
- [ ] Accessibility score > 95
- [ ] < 3 second initial load

---

## ✅ CRITICAL CHECKLIST

### Before Starting Week 1
- [ ] Clone repository
- [ ] Install dependencies
- [ ] Review PRD & WBS
- [ ] Set up development environment
- [ ] Connect to MongoDB
- [ ] Test local development

### Before Week 2 Ends
- [ ] M1: 5 authentication tasks deployed to staging
- [ ] M2: Login/Register/Password Reset UI complete
- [ ] API documentation updated
- [ ] Both can demonstrate auth flow

### Before Week 4 Ends
- [ ] M1: All donation APIs complete
- [ ] M2: All donation UI complete
- [ ] Integration tests passing
- [ ] Users can create & request donations

### Before Week 6 Ends
- [ ] M1: All notifications/chat APIs complete
- [ ] M2: All notification UIs complete
- [ ] Real-time features tested

### Before Week 8
- [ ] All tests passing
- [ ] Security audit complete
- [ ] Performance benchmarks met
- [ ] Ready for production

---

## 🚨 COMMON BLOCKERS & SOLUTIONS

### "M1's API is not ready for M2 to integrate"
**Solution:** Use mock data while M1 finishes. M2 can build UI separately.

### "Database queries are slow"
**Solution:** Don't wait! Add indexes from day 1. M1 must monitor performance continuously.

### "API and Frontend versions mismatch"
**Solution:** Maintain API versioning (/api/v1/). Document breaking changes.

### "Security vulnerabilities found late"
**Solution:** Run security checks daily. Use OWASP guidelines from the start.

### "Testing coverage is low"
**Solution:** Write tests as you code, not after. Aim for 10%+ per sprint.

---

## 📞 COMMUNICATION SCHEDULE

### Daily Standup ⏰
**Time:** 10:00 AM (15 minutes)  
**Topics:** Yesterday's work, today's plan, blockers

### Weekly Review 🗣️
**Time:** Friday 2:00 PM (30 minutes)  
**Topics:** Demo features, discuss risks, plan next week

### PR Review 🔍
**Target:** 24 hours turnaround  
**Rule:** All tests must pass before merge

### Slack/Discord
**Use for:** Quick questions, quick wins, blocker alerts

---

## 📚 DOCUMENTATION LOCATIONS

| Document | Location | Owner | Purpose |
|----------|----------|-------|---------|
| PRD (This Project) | `/PRD.md` | M1 to maintain | Requirements & vision |
| Work Breakdown | `/WORK_BREAKDOWN_STRUCTURE.md` | Both | Task details |
| API Documentation | `backend/docs/API.md` | M1 | API endpoints |
| Component Library | `frontend/COMPONENTS.md` | M2 | UI components |
| Database Schema | `backend/docs/SCHEMA.md` | M1 | Data structure |
| Deployment Guide | `/DEPLOYMENT.md` | M1 | How to deploy |
| Architecture | `backend/docs/ARCHITECTURE.md` | M1 | System design |

---

## 🎓 QUICK LEARNING RESOURCES

### For M1 (Backend)
- Express.js: https://expressjs.com/
- MongoDB: https://docs.mongodb.com/
- JWT: https://jwt.io/
- API Design: https://www.restfulapi.net/
- Security: https://owasp.org/

### For M2 (Frontend)
- React: https://react.dev/
- Vite: https://vitejs.dev/
- React Router: https://reactrouter.com/
- Axios: https://axios-http.com/
- CSS: https://web.dev/learn/css/

---

## 🚀 DEPLOYMENT CHECKLIST

### Staging (Week 6)
- [ ] Backend deployed to staging server
- [ ] Frontend deployed to staging CDN
- [ ] Database backups configured
- [ ] Monitoring & alerts set up
- [ ] Team given staging credentials

### Production (Week 8)
- [ ] All tests passing
- [ ] Security review completed
- [ ] Performance benchmarks met
- [ ] Monitoring dashboards live
- [ ] On-call rotation established
- [ ] Rollback plan documented

---

## 💡 TIPS FOR SUCCESS

### For M1
1. **Database First:** Design your schema well before coding
2. **API Contracts:** Define API structure before implementing
3. **Error Handling:** Return consistent error responses
4. **Logging:** Log everything for debugging
5. **Performance:** Test with realistic data volumes
6. **Documentation:** Document as you code

### For M2
1. **Component First:** Break UI into reusable components
2. **Responsive Design:** Mobile-first approach
3. **API Integration:** Mock APIs first, connect later
4. **Accessibility:** Build a11y into every component
5. **Performance:** Lazy load, code split, optimize images
6. **Testing:** Test user interactions, not implementation

### For Both
1. **Communication:** Overcommunicate, especially on blockers
2. **Code Reviews:** Review each other's code (learn together)
3. **Version Control:** Small, frequent commits
4. **Automation:** Set up CI/CD from the start
5. **Monitoring:** Set up alerts early
6. **User Feedback:** Get feedback on features early

---

## 📞 WHEN TO ESCALATE

### Escalate to Project Manager If:
- Task will take 50%+ more time than estimated
- External dependency blocking progress
- Need to change scope/timeline
- Resource constraint discovered
- Team conflict or morale issue

### Escalate to Tech Lead If:
- Architectural decision needed
- Technical debt discovered
- Performance issues blocking feature
- Security vulnerability found
- Third-party service integration failing

---

## 🎉 LAUNCH CHECKLIST (Week 8)

### Day Before Launch
- [ ] Final smoke tests passed
- [ ] Backups verified
- [ ] Monitoring dashboards ready
- [ ] On-call team briefed
- [ ] Rollback plan shared
- [ ] Team celebrates! 🎊

### Launch Day
- [ ] 5 min: Final check
- [ ] 10 min: Deploy to production
- [ ] 30 min: Monitor closely
- [ ] 2 hours: Heavy monitoring
- [ ] 24 hours: Stability check

---

## 📝 NOTES

- **Total Project:** ~450 hours of development
- **Each Team Member:** ~200-250 hours
- **Per Week:** ~50-60 hours average
- **Sprint Length:** 2 weeks per phase

---

**Remember:** 🌟 "The best code is code that gets shipped!"

Good luck! 🚀
