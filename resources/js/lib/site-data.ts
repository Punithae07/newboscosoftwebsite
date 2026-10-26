export type ProductSlug =
  | "smartschoolnxt"
  | "higrade"
  | "acme-erp"
  | "microfund"
  | "medsysb"
  | "cristo-suite"
  | "eaudithub";

export const products: Record<
  ProductSlug,
  {
    name: string;
    slug: ProductSlug;
    category: string;
    tagline: string;
    description: string;
    headline: string;
    subheadline: string;
    modules: string[];
    benefits: string[];
    idealUsers: string[];
    heroImage: string;
    successStoriesImage: string;
    ctaBannerImage: string;
    clients: { name: string; location?: string; logo: string }[];
    testimonials: { q: string; n: string; o: string }[];
    cta: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
    eyebrow?: string;
    heroCtas?: { primary: { label: string; href?: string }; secondary: { label: string; href?: string } };
    productSuiteTitle?: string;
    productSuiteIntro?: string;
    productItems?: { title: string; description: string; logo?: string }[];
    featuresTitle?: string;
    featuresIntro?: string;
    featuresCta?: string;
    featureItems?: { title: string; description: string }[];
    advantagesTitle?: string;
    advantagesIntro?: string;
    advantageItems?: { title: string; description?: string }[];
    caseStudiesTitle?: string;
    caseStudiesCopy?: string;
    caseStudiesCta?: string;
    faqs?: { q: string; a: string }[];
  }
> = {
  smartschoolnxt: {
    name: "SmartSchoolNxt",
    slug: "smartschoolnxt",
    seoTitle: "School Management ERP & Administration Software | SmartSchoolNxt",
    seoDescription:
      "Connect admissions, academics, attendance, fees, exams, and school communication in one configurable school management platform.",
    seoKeywords:
      "school management ERP, student information system, school administration software, school fee management",
    category: "School ERP",
    eyebrow: "K–12 School Management",
    tagline: "Bring every part of school operations together.",
    headline: "Bring every part of school operations together",
    subheadline:
      "Give administrators, teachers, and school leaders a clearer way to manage admissions, academics, fees, attendance, examinations, and daily communication. SmartSchoolNxt creates connected workflows so teams spend less time moving information and more time supporting learning.",
    description:
      "Give administrators, teachers, and school leaders a clearer way to manage admissions, academics, fees, attendance, examinations, and daily communication. SmartSchoolNxt creates connected workflows so teams spend less time moving information and more time supporting learning.",
    heroCtas: {
      primary: { label: "Request a Demo", href: "/contact-us" },
      secondary: { label: "Explore Features", href: "https://smartschoolonline.com/" },
    },
    featuresTitle: "The tools behind a better-run school",
    featuresIntro:
      "SmartSchoolNxt creates connected workflows so teams spend less time moving information and more time supporting learning.",
    featuresCta: "See All Modules",
    featureItems: [
      {
        title: "Admissions",
        description:
          "Organize applications, enrollment decisions, and student onboarding in one workflow.",
      },
      {
        title: "Academics",
        description:
          "Maintain classes, academic structures, and learning-related records without scattered spreadsheets.",
      },
      {
        title: "Fees",
        description:
          "Track invoices, receipts, balances, and collections with transparent records.",
      },
      {
        title: "Attendance",
        description:
          "Record attendance and provide authorized staff with timely visibility.",
      },
      {
        title: "Examinations",
        description:
          "Coordinate assessment schedules, marks, and published results.",
      },
      {
        title: "Homework",
        description:
          "Share assignments and track classroom follow-up.",
      },
      {
        title: "Communication",
        description:
          "Keep parents, staff, and students informed through structured channels.",
      },
      {
        title: "Transport",
        description:
          "Organize routes, student allocations, and relevant transport records.",
      },
      {
        title: "Timetable",
        description:
          "Build and maintain coordinated class and staff schedules.",
      },
      {
        title: "Reports",
        description:
          "Give school leaders a consistent view of operations and performance.",
      },
      {
        title: "Mobile access",
        description:
          "Help authorized users stay connected beyond the desktop, subject to deployed modules.",
      },
    ],
    modules: [
      "Admissions",
      "Academics",
      "Fees",
      "Attendance",
      "Examinations",
      "Homework",
      "Communication",
      "Transport",
      "Timetable",
      "Reports",
      "Mobile access",
    ],
    advantagesTitle: "Less administration. More room to lead.",
    advantagesIntro:
      "SmartSchoolNxt is designed for schools that need tighter process control, better family engagement, and more reliable academic and administrative visibility.",
    advantageItems: [
      {
        title: "One student record",
        description:
          "Reduce duplicate entry across admissions, academics, and administration.",
      },
      {
        title: "Clearer fee visibility",
        description:
          "Give finance teams an organized view of dues and receipts.",
      },
      {
        title: "Closer family engagement",
        description:
          "Make important school communication easier to access.",
      },
      {
        title: "More reliable examination workflows",
        description:
          "Coordinate marks, schedules, and reporting.",
      },
      {
        title: "Multi-role usability",
        description:
          "Give each user access appropriate to their responsibilities.",
      },
      {
        title: "Management oversight",
        description:
          "Make routine school decisions with up-to-date operational information.",
      },
    ],
    benefits: [
      "One student record across admissions and academics",
      "Clearer fee visibility and collections",
      "Closer family engagement",
      "More reliable examination workflows",
      "Multi-role usability and management oversight",
    ],
    caseStudiesTitle: "Designed around real school needs",
    caseStudiesCopy:
      "Schools use connected digital tools to improve administration and communication. Feature verified SmartSchoolNxt customer statements here; do not publish the unverified percentage improvement or unattributed names appearing in Version 1.",
    caseStudiesCta: "Ask for a School Demo",
    faqs: [
      {
        q: "Who is SmartSchoolNxt for?",
        a: "Independent schools, school networks, and K–12 administrators seeking a coordinated school operations platform.",
      },
      {
        q: "Can it cover admissions through examinations?",
        a: "The platform’s module portfolio includes admissions, academics, fees, attendance, timetables, and examinations; scope depends on configuration.",
      },
      {
        q: "Can families and teachers access information?",
        a: "Role-based access and supported communication modules are available subject to deployment scope.",
      },
      {
        q: "Is SmartSchoolNxt designed for US schools?",
        a: "Local terminology, integration, data privacy, and regulatory needs should be reviewed during discovery before a US deployment is proposed.",
      },
      {
        q: "What happens during implementation?",
        a: "We assess your workflows, configure relevant modules, support data migration and training, and plan rollout in stages.",
      },
    ],
    idealUsers: ["Schools", "School groups", "Principals", "Administrators", "Teachers", "Parents", "Students"],
    heroImage: "/images/product/smartschoolnxt-school-erp-hd.avif",
    successStoriesImage: "/images/smartschool/smartschool-schoolimg.avif",
    ctaBannerImage: "/images/smartschool/smartschoolimge-pr.avif",
    clients: [
      { name: "Fuscos School", logo: "/images/smartschool/client01.avif" },
      { name: "St. Joseph's Matric Hr. Sec. School", logo: "/images/smartschool/client02.avif" },
      { name: "Auxilium ICSE School", logo: "/images/smartschool/client03.avif" },
      { name: "K-12 partner school", logo: "/images/smartschool/client04.avif" },
      { name: "District school partner", logo: "/images/smartschool/client05.avif" },
      { name: "Regional school partner", logo: "/images/smartschool/client06.avif" },
    ],
    testimonials: [
      {
        q: "We are using SmartSchoolNxT software for the past 8 years. The software program is mainly useful to print the report cards, sending SMS and other features. We are happy and satisfied with your services.",
        n: "Sr. Ronica Chandra",
        o: "Principal, Bangalore",
      },
      {
        q: "We use SmartSchoolNxT software by Bosco Soft Technologies for the past two year. The software is excellent. We are happy and satisfied with the services rendered by your staff.",
        n: "Sr. Shiji Abraham",
        o: "Principal, Angamaly",
      },
      {
        q: "Giving of Progress Cards are very easy and it saves lot of time than when it was hand written by individual class Teachers. Thanks to SmartSchool Team.",
        n: "Sr. Lincy FMA",
        o: "Principal, Bangalore",
      },
      {
        q: "I personally appreciate your team for the patient listening to our staff to solve the issues whenever raised. Together with your cooperation we are able to give quality services to our students and parents.",
        n: "Fr. G. Maria Gladston",
        o: "Correspondent, Nagercoil",
      },
      {
        q: "With the help of SmartSchoolNxT, we get a complete end to end system that enables us to cohesively and efficiently manage all our School management activities in an efficient manner. The way you respond to the problem areas and troubleshoot accordingly is great. We are very happy to be associated with you.",
        n: "Rev. Msgr. Leslie Moras",
        o: "Episcopal Vicar, For Education & Medical Ministries, Mysore",
      },
      {
        q: "We would like to extend our heartfelt gratitude for the exceptional support and dedication in implementing and utilizing various modules such as Student Attendance, Examination, Mark Entry, Report Card, Fees, Fee Reminder, Inventory, Circular & Notification, Staff Attendance, and Website. The seamless integration of these features has played a pivotal role in streamlining our administrative processes and significantly enhancing the overall efficiency of our school operations. Your tireless efforts in ensuring the successful execution of these modules have not only improved day-to-day management but also brought about a more structured and effective system. We greatly appreciate the continuous support and collaboration that has been key to achieving these milestones.",
        n: "Fr. Dr J. Dennis solomon sdb",
        o: "Baithalongso, Assam",
      },
    ],
    cta: "Request a SmartSchoolNxt Demo",
  },
  higrade: {
    name: "HiGrade",
    slug: "higrade",
    category: "Higher Education ERP",
    seoTitle: "Higher Education ERP & Campus Management | HiGrade",
    seoDescription:
      "Unify admissions, student lifecycle, academics, exams, accreditation-related records, finance, and campus reporting with HiGrade.",
    seoKeywords: "higher education ERP, university management system, student lifecycle software, campus ERP",
    eyebrow: "Higher Education Technology",
    tagline: "One connected foundation for the modern campus.",
    headline: "One connected foundation for the modern campus",
    subheadline:
      "Colleges and universities work across a complex mix of student services, academic departments, examinations, administration, and finance. HiGrade helps bring these operations together so teams work with consistent information and leadership has greater visibility.",
    description:
      "Colleges and universities work across a complex mix of student services, academic departments, examinations, administration, and finance. HiGrade helps bring these operations together so teams work with consistent information and leadership has greater visibility.",
    heroCtas: {
      primary: { label: "Request a Demo", href: "/contact-us" },
      secondary: { label: "Explore Modules", href: "https://higrade.live/" },
    },
    featuresTitle: "Support students and staff across the institutional lifecycle",
    featuresIntro:
      "HiGrade brings operations together so teams work with consistent information and leadership has greater visibility across the academic and administrative lifecycle.",
    featuresCta: "See All Modules",
    featureItems: [
      {
        title: "Admissions",
        description: "Organize applicant processes and enrollment records.",
      },
      {
        title: "Program management",
        description: "Structure programs, courses, cohorts, and academic details.",
      },
      {
        title: "Timetables",
        description: "Coordinate class schedules and resources.",
      },
      {
        title: "Examinations",
        description: "Manage assessment processes and result workflows.",
      },
      {
        title: "Outcome-based education",
        description: "Support outcome mapping and academic evaluation where configured.",
      },
      {
        title: "Accreditation",
        description: "Organize evidence and reporting for applicable accreditation processes.",
      },
      {
        title: "Learning management",
        description: "Connect teaching and learning workflows through supported modules.",
      },
      {
        title: "Finance",
        description: "Coordinate institutional financial operations.",
      },
      {
        title: "HR and payroll",
        description: "Manage personnel and compensation records.",
      },
      {
        title: "Reports",
        description: "Make academic and administrative information more accessible.",
      },
      {
        title: "Student portals",
        description: "Give students access to relevant services and information.",
      },
    ],
    modules: [
      "Admissions",
      "Program management",
      "Timetables",
      "Examinations",
      "Outcome-based education",
      "Accreditation",
      "Learning management",
      "Finance",
      "HR and payroll",
      "Reports",
      "Student portals",
    ],
    advantagesTitle: "Less fragmentation. Better academic and administrative decisions.",
    advantagesIntro:
      "HiGrade helps higher education institutions improve coordination, documentation, student visibility, and decision-making across the campus ecosystem.",
    advantageItems: [
      {
        title: "Connect student information across the institution.",
      },
      {
        title: "Reduce repeated data entry among departments.",
      },
      {
        title: "Make examination and academic processes more consistent.",
      },
      {
        title: "Support preparation of accreditation evidence.",
      },
      {
        title: "Improve access to operational reporting.",
      },
      {
        title: "Support responsible access for students, faculty, and staff.",
      },
    ],
    benefits: [
      "Connect student information across the institution",
      "Reduce repeated data entry among departments",
      "Make examination and academic processes more consistent",
      "Support preparation of accreditation evidence",
      "Improve access to operational reporting",
    ],
    caseStudiesTitle: "Trusted by Higher Education Institutions",
    caseStudiesCopy:
      "Discover why colleges and universities choose HiGrade to bring campus operations together with consistent data and leadership visibility.",
    caseStudiesCta: "Request a HiGrade Demo",
    faqs: [
      {
        q: "Who is HiGrade for?",
        a: "Colleges, universities, and education groups seeking coordinated campus administration.",
      },
      {
        q: "Can it manage the complete student lifecycle?",
        a: "Core modules support multiple phases from admissions through academic administration; exact scope is confirmed in implementation.",
      },
      {
        q: "Does it support accreditation?",
        a: "It can organize data and evidence, but accreditation requirements differ by jurisdiction and framework.",
      },
      {
        q: "Is HiGrade suitable for US higher education?",
        a: "US terminology, SIS/LMS integrations, FERPA and other obligations, and local processes require a separate suitability assessment.",
      },
      {
        q: "Can we migrate from an existing system?",
        a: "Migration feasibility and data quality are reviewed during discovery.",
      },
    ],
    idealUsers: ["Colleges", "Universities", "Autonomous institutions", "Multi-campus education groups"],
    heroImage: "/images/product/higrade-campus-erp-hd.webp",
    successStoriesImage: "/images/cristo/college-staff.avif",
    ctaBannerImage: "/images/cristo/college-student.avif",
    clients: [
      { name: "Mar Gregorios College", location: "Chennai", logo: "/images/higrade/client01.avif" },
      { name: "Voorhees College", location: "Vellore", logo: "/images/higrade/client012.avif" },
      {
        name: "Chevalier T. Thomas Elizabeth College for Women",
        location: "Perambur",
        logo: "/images/higrade/client03.avif",
      },
      { name: "Don Bosco College", location: "Yelagiri Hills", logo: "/images/higrade/client04.avif" },
      {
        name: "Marudhar Kesari Jain College for Women",
        location: "Vaniyambadi",
        logo: "/images/higrade/client05.avif",
      },
      { name: "Don Bosco College", location: "Itanagar", logo: "/images/higrade/client08.avif" },
    ],
    testimonials: [
      {
        q: "The HiGrade ERP is user friendly and it gives overall reports of the institute. And it helps us to maintain students profile effectively and we are able maintain students mentoring easily for our reference. It's easy to access from anywhere.",
        n: "Rev. Fr. John Joseph SDB",
        o: "Vice Principal, Don Bosco Polytechnic College, Thirukazhukundram",
      },
      {
        q: "Kudos to Boscosoft Team for strategizing and developing a comprehensive and effective ERP for automation of HEIs. St. Alphonsa College of Arts and Science, Karungal is very happy to manage the College through HiGrade. We are very happy to receive prompt services in managing and resolving issues. Keep up the good work and come out with newer modules and features for effective management of HEIs.",
        n: "Dr S Isias",
        o: "Principal, St Alphonsa College of Arts and Science, Kanyakumari",
      },
      {
        q: "The HiGrade ERP offered by Bosco Soft Technologies enables our institute to move towards excellence. With various possibilities of analysis and report generation, we are endowed with transparency, accountability and systematization. It helps both the staff and the students to be aware and to be exact in their duties and responsibilities. With many processes made simple, we are now able to invest our time and energy, not so much in maintaining the records, but in the formation of students. Thanks to Boscosoft.",
        n: "Rev. Fr. Prince Raja SDB",
        o: "Dean of Studies, Don Bosco Polytechnic College, Tharangambadi",
      },
      {
        q: "We had two strong months so far with the HiGrade ERP portal. As an institution believes in the trustworthiness of a software, you have made it to the next level of executing reliability and convenience. The portal is user friendly and easily operated and understood by faculty members. The availability of the technical staff to clarify any doubts either at the level of admin or faculty is appreciable.",
        n: "Dr. Deepa BM",
        o: "Principal, Sacred Heart Degree College for Women, Bengaluru",
      },
      {
        q: "I appreciate the initiatives taken by the Boscosoft to make our dream realized in the form of HiGrade ERP. It can be of great help for the higher education institutions to keep them up to date. The options provided are user friendly. The customer support is prompt and of standard. Congratulations to the team and all those who are accompanying them. God bless you all.",
        n: "Rev. Fr. S. Bharathi Bernadsha SDB",
        o: "Vice Principal, Don Bosco College, Dharmapuri",
      },
      {
        q: "Loyola College commends HiGrade for significantly streamlining the administrative processes and delivering outstanding service. I Appreciate and highly recommend the platform for reliable college automation software.",
        n: "Rev. Fr. Basil Xavier SJ",
        o: "Principal, Loyola College, Vettavalam",
      },
      {
        q: "I would like to express my sincere thanks for your continuous effort and strong backend support. Your prompt responses, technical expertise, and dedication greatly helped us ensure smooth and accurate mark entry, verification, and the successful publication of results within the scheduled timeline. Thank you for your timely clarifications, quick resolutions, and constant follow-up throughout the process-your support made a significant impact, and we sincerely appreciate your commitment.",
        n: "Dr. G. Vinu Priya",
        o: "Controller of Examinations, DKM College for Women (Autonomous)",
      },
    ],
    cta: "Request a HiGrade Demo",
  },
  "acme-erp": {
    name: "Acme.erp",
    slug: "acme-erp",
    seoTitle: "Financial ERP for NGOs & Multi-Branch Organizations | Acme.erp",
    seoDescription:
      "Improve fund accounting, branch oversight, budgeting, assets, payroll, and consolidated financial reporting with Acme.erp.",
    seoKeywords:
      "nonprofit financial management software, fund accounting ERP, multi-branch accounting, NGO accounting software",
    category: "Financial Management ERP",
    eyebrow: "Financial Management & Accountability",
    tagline: "Make every fund, branch, and financial decision clearer.",
    headline: "Make every fund, branch, and financial decision clearer",
    subheadline:
      "Financial stewardship becomes harder when teams manage restricted funds, multiple locations, assets, budgets, and reports in disconnected tools. Acme.erp brings these processes into a more coherent financial management environment.",
    description:
      "Financial stewardship becomes harder when teams manage restricted funds, multiple locations, assets, budgets, and reports in disconnected tools. Acme.erp brings these processes into a more coherent financial management environment.",
    heroCtas: {
      primary: { label: "Request a Demo", href: "/contact-us" },
      secondary: { label: "Explore Acme.erp", href: "https://www.acmeerp.org/" },
    },
    featuresTitle: "Financial control without the spreadsheet sprawl",
    featuresIntro:
      "Acme.erp brings restricted funds, branch transactions, budgeting, assets, and payroll into a coherent financial management environment.",
    featuresCta: "See All Modules",
    featureItems: [
      {
        title: "Financial accounting",
        description: "Maintain transactions, ledgers, and financial records.",
      },
      {
        title: "Fund management",
        description: "Track designated resources and related activity.",
      },
      {
        title: "Branch control",
        description: "Organize transactions and oversight across locations.",
      },
      {
        title: "Head office consolidation",
        description: "Bring branch-level information together for group reporting.",
      },
      {
        title: "Payroll",
        description: "Support staff payroll processes.",
      },
      {
        title: "Assets",
        description: "Record and manage fixed assets.",
      },
      {
        title: "Stock",
        description: "Track inventory where applicable.",
      },
      {
        title: "Budgeting",
        description: "Compare planned expenditure and activity against actuals.",
      },
      {
        title: "Reporting",
        description: "Generate management and financial statements.",
      },
      {
        title: "Compliance",
        description: "Organize documentation and reports for applicable internal requirements.",
      },
    ],
    modules: [
      "Financial accounting",
      "Fund management",
      "Branch control",
      "Head office consolidation",
      "Payroll",
      "Assets",
      "Stock",
      "Budgeting",
      "Reporting",
      "Compliance",
    ],
    advantagesTitle: "Financial confidence across complex organizations",
    advantagesIntro:
      "Acme.erp is built for mission-driven and multi-branch organizations that need trustworthy finance operations, stronger controls, and transparent reporting.",
    advantageItems: [
      {
        title: "Give finance leaders a consolidated view of operations.",
      },
      {
        title: "Strengthen controls around fund use and reporting.",
      },
      {
        title: "Reduce duplication in branch reporting.",
      },
      {
        title: "Improve preparation for internal and external audits.",
      },
      {
        title: "Support better budget accountability and decision-making.",
      },
    ],
    benefits: [
      "Consolidated view of operations for finance leaders",
      "Strengthen controls around fund use and reporting",
      "Reduce duplication in branch reporting",
      "Improve preparation for internal and external audits",
      "Support better budget accountability and decision-making",
    ],
    caseStudiesTitle: "Financial Confidence in Action",
    caseStudiesCopy:
      "Discover how NGOs, religious institutes, and multi-branch institutions gain consolidated financial visibility and audit readiness with Acme.erp.",
    caseStudiesCta: "Request an Acme.erp Demo",
    faqs: [
      {
        q: "Who is Acme.erp for?",
        a: "NGOs, religious institutes, charitable institutions, and multi-branch organizations managing complex finances.",
      },
      {
        q: "Does it support fund accounting?",
        a: "Fund tracking and related reporting are within the product domain; specific accounting requirements must be validated.",
      },
      {
        q: "Can branches report to headquarters?",
        a: "Branch management and consolidation are core functional areas.",
      },
      {
        q: "Does it meet US nonprofit accounting requirements?",
        a: "This must be assessed against US GAAP, local tax rules, and the organization’s reporting obligations; compliance is not assumed.",
      },
      {
        q: "How is implementation approached?",
        a: "We map accounts, funds, locations, approval flows, reporting, and migration needs before configuration.",
      },
    ],
    idealUsers: [
      "NGOs",
      "Religious institutes",
      "Charitable institutions",
      "Nonprofit networks",
      "Multi-branch organizations",
    ],
    heroImage: "/images/product/acme-erp-finance-hd.avif",
    successStoriesImage: "/images/acemerp/accounitsoftware01.avif",
    ctaBannerImage: "/images/acemerp/accounitsoftware02.avif",
    clients: [
      { name: "Anne of Providence", logo: "/images/acemerp/client01.avif" },
      { name: "Claretian Missionaries", logo: "/images/acemerp/client02.avif" },
      { name: "Order of Friars Minor Capuchin", logo: "/images/acemerp/client03.avif" },
      { name: "Immaculate Heart of Mary's Generalate", logo: "/images/acemerp/client04.avif" },
      { name: "SAV", logo: "/images/acemerp/client05.avif" },
      { name: "Sisters of St. Anne Madras", logo: "/images/acemerp/client06.avif" },
    ],
    testimonials: [
      {
        q: "The Best ERP, that helped us to bring our accounts in branches under control",
        n: "Fr. Edwin Vasanth",
        o: "Economer, Salesians of Don Bosco, Chennai Province.",
      },
      {
        q: "Acme.erp is one of the best accounting software, very easy and simple to use and get the desirable reports.",
        n: "Sr. Bridgit Joseph",
        o: "Sisters of Charity Hyderabad, Provincial Treasurer.",
      },
      {
        q: "I appreciate all of your help, enthusiasm, and attention to detail with your duties. This ERP is better off with you. We are happy and satisfied with the services rendered by your staff.",
        n: "Sr. Theresa",
        o: "SAT Mumbai, Provincial Treasurer.",
      },
      {
        q: "Acme.erp software helps all Institutions and organizations to make efficient use of their system and maintain complete transparency.",
        n: "Sr. T. Agnes",
        o: "SAT Trichy, Treasurer.",
      },
    ],
    cta: "Request an Acme.erp Demo",
  },
  microfund: {
    name: "MicroFUND",
    slug: "microfund",
    seoTitle: "Microfinance Loan & Field Collection Management | MicroFUND",
    seoDescription:
      "Manage borrower records, loan origination, disbursements, repayments, field collections, and portfolio reporting with MicroFUND.",
    seoKeywords:
      "microfinance management software, loan management software, field collection platform, borrower management",
    category: "Microfinance Management",
    eyebrow: "Financial Inclusion Technology",
    tagline: "Keep lending operations connected from application to repayment.",
    headline: "Keep lending operations connected from application to repayment",
    subheadline:
      "MicroFUND helps community finance institutions and microfinance operators organize borrower information, loans, collections, and field operations so teams can work with greater accuracy and visibility.",
    description:
      "MicroFUND helps community finance institutions and microfinance operators organize borrower information, loans, collections, and field operations so teams can work with greater accuracy and visibility.",
    heroCtas: {
      primary: { label: "Request a Demo", href: "/contact-us" },
      secondary: { label: "Discover Capabilities", href: "https://microfund.in/" },
    },
    featuresTitle: "Clearer control throughout the lending lifecycle",
    featuresIntro:
      "Organize borrower information, loans, collections, and field operations with greater accuracy and operational clarity.",
    featuresCta: "See All Modules",
    featureItems: [
      {
        title: "Loan origination",
        description: "Structure applications, review, and approval records.",
      },
      {
        title: "Disbursement",
        description: "Track approved loans and disbursement activities.",
      },
      {
        title: "Repayment tracking",
        description: "Monitor schedules, installments, and balances.",
      },
      {
        title: "Borrower management",
        description: "Maintain a consistent borrower profile and loan history.",
      },
      {
        title: "Field staff mobile access",
        description: "Give field teams relevant account information where configured.",
      },
      {
        title: "Collections",
        description: "Record and monitor collection activity and follow-up.",
      },
      {
        title: "Savings",
        description: "Support savings-related workflows where applicable to the operating model.",
      },
      {
        title: "Compliance reports",
        description: "Produce reports required for internal governance and configured jurisdictions.",
      },
      {
        title: "MIS dashboards",
        description: "Review portfolio indicators and field performance.",
      },
      {
        title: "Impact reporting",
        description: "Assess reach and participation using available data.",
      },
    ],
    modules: [
      "Loan origination",
      "Disbursement",
      "Repayment tracking",
      "Borrower management",
      "Field staff mobile access",
      "Collections",
      "Savings",
      "Compliance reports",
      "MIS dashboards",
      "Impact reporting",
    ],
    advantagesTitle: "More visibility across every branch and field team",
    advantagesIntro:
      "Built for community lending and microfinance teams that need stronger borrower visibility, collection control, and field-level execution.",
    advantageItems: [
      {
        title: "Organize borrower histories for more informed servicing.",
      },
      {
        title: "Reduce dependence on disconnected loan and collection registers.",
      },
      {
        title: "Give management a clearer view of repayment activity.",
      },
      {
        title: "Support field operations with current information.",
      },
      {
        title: "Improve consistency in portfolio and impact reporting.",
      },
    ],
    benefits: [
      "Organize borrower histories for more informed servicing",
      "Reduce dependence on disconnected loan and collection registers",
      "Give management a clearer view of repayment activity",
      "Support field operations with current information",
      "Improve consistency in portfolio and impact reporting",
    ],
    caseStudiesTitle: "Trusted by Community Finance Providers",
    caseStudiesCopy:
      "Discover how microfinance operators and community lenders use MicroFUND to keep credit operations connected from application to repayment.",
    caseStudiesCta: "Request a MicroFUND Demo",
    faqs: [
      {
        q: "Who is MicroFUND designed for?",
        a: "Microfinance institutions, community finance providers, cooperatives, and NGOs managing structured credit operations.",
      },
      {
        q: "Can field teams record collections?",
        a: "Collection and field mobility workflows are part of the product scope, subject to configuration and connectivity requirements.",
      },
      {
        q: "Does MicroFUND include financial reporting?",
        a: "It supports management reporting; statutory reports require jurisdiction-specific review.",
      },
      {
        q: "Can it support US lending operations?",
        a: "Regulatory, licensing, consumer protection, disclosure, and data handling requirements must be assessed before making a US suitability claim.",
      },
      {
        q: "Can it integrate with accounting?",
        a: "Integration options can be scoped using the customer’s data and system requirements.",
      },
    ],
    idealUsers: ["Microfinance institutions", "SHGs", "Cooperatives", "NGOs", "Community finance organizations"],
    heroImage: "/images/product/microfund-lending-platform-hd.avif",
    successStoriesImage: "/images/microfund/microfund012.avif",
    ctaBannerImage: "/images/microfund/microfund011.avif",
    clients: [
      { name: "Regional microfinance partner", logo: "/images/microfund/mic-clit1.avif" },
      { name: "Field finance partner", logo: "/images/microfund/mic-clit2.avif" },
      { name: "Impact lending partner", logo: "/images/microfund/mic-clit3.avif" },
    ],
    testimonials: [
      {
        q: "Enhancing Financial Inclusion: In our mission to enhance financial inclusion, Boscosoft's Micro-Funding software has been instrumental. It has allowed us to efficiently manage small loans, which has had a profound impact on the lives of individuals who previously had limited access to financial services.",
        n: "Dhruv Bhattacharya",
        o: "Financial Inclusion Lead",
      },
      {
        q: "Empowering Entrepreneurs: As a startup founder, securing funding was my biggest hurdle. MicroFUND offered by BoscoSoft was a game-changer. It simplified the loan application process and connected me with lenders interested in supporting small businesses. I'm grateful for the opportunity to grow my business with such an intuitive platform.",
        n: "Bellamy Ainsworth",
        o: "Startup Founder",
      },
      {
        q: "Revolutionizing Microloans: MicroFUND from BoscoSoft has revolutionized how we manage our microloan portfolio. Its user-friendly interface and powerful analytics have enabled us to make data-driven decisions, streamline our operations, and offer better support to the entrepreneurs we serve.",
        n: "Farrah Zeytoun",
        o: "Microloan Portfolio Manager",
      },
      {
        q: "A Catalyst for Change: MicroFUND is about more than just loans; it's about making dreams a reality. BoscoSoft's MicroFUND has been a catalyst for change in our community, providing a seamless experience for both lenders and borrowers. It's not just a tool; it's a bridge to a better future.",
        n: "Richard Walker",
        o: "Community Finance Leader",
      },
    ],
    cta: "See MicroFund in Action",
  },
  medsysb: {
    name: "MedSysB",
    slug: "medsysb",
    category: "Hospital Management",
    seoTitle: "Hospital Management Software & Integrated ERP | MedSysB",
    seoDescription:
      "Connect patient registration, diagnostics, pharmacy, billing, medical records, and hospital administration with MedSysB.",
    seoKeywords:
      "hospital management software, hospital ERP, patient administration system, pharmacy and billing integration",
    eyebrow: "Healthcare Operations",
    tagline: "Connected hospital operations, from registration to reporting.",
    headline: "Connected hospital operations, from registration to reporting",
    subheadline:
      "Hospitals depend on accurate information moving between care and administrative teams. MedSysB brings patient workflows, departments, financial processes, and management reporting into a coordinated operating platform.",
    description:
      "Hospitals depend on accurate information moving between care and administrative teams. MedSysB brings patient workflows, departments, financial processes, and management reporting into a coordinated operating platform.",
    heroCtas: {
      primary: { label: "Request a Demo", href: "/contact-us" },
      secondary: { label: "Explore the Solution", href: "https://medsysb.com/" },
    },
    featuresTitle: "Support the hospital journey end to end",
    featuresIntro:
      "MedSysB brings patient workflows, departments, financial processes, and management reporting into a coordinated operating platform.",
    featuresCta: "View All Modules",
    featureItems: [
      {
        title: "Outpatient and inpatient registration",
        description: "Organize patient arrival, admissions, and related records.",
      },
      {
        title: "Diagnostics",
        description: "Connect laboratory and diagnostic requests, results, and departmental workflows.",
      },
      {
        title: "Pharmacy",
        description: "Track medication-related operations, stock activity, and pharmacy billing.",
      },
      {
        title: "Billing",
        description: "Coordinate billable services, charges, and receipts with greater accuracy.",
      },
      {
        title: "Operating theater",
        description: "Support scheduling and procedure-related administrative records.",
      },
      {
        title: "Medical records",
        description: "Maintain authorized access to structured patient information.",
      },
      {
        title: "HR",
        description: "Organize employee records, leave, and workforce administration.",
      },
      {
        title: "Payroll",
        description: "Connect staff compensation processes with organizational records.",
      },
      {
        title: "Dietary",
        description: "Support diet-related requests and internal coordination where configured.",
      },
      {
        title: "Reports",
        description: "Surface key hospital operational and financial indicators.",
      },
      {
        title: "Messaging",
        description: "Improve communication among authorized teams using supported channels.",
      },
    ],
    modules: [
      "Outpatient and inpatient registration",
      "Diagnostics",
      "Pharmacy",
      "Billing",
      "Operating theater",
      "Medical records",
      "HR",
      "Payroll",
      "Dietary",
      "Reports",
      "Messaging",
    ],
    advantagesTitle: "Better coordination for a more responsive hospital",
    advantagesIntro:
      "MedSysB brings services and charges into clearer alignment while supporting seamless communication across departments.",
    advantageItems: [
      {
        title: "Joined-up departments",
        description: "Reduce information gaps across reception, pharmacy, diagnostics, and accounts.",
      },
      {
        title: "Organized patient movement",
        description: "Help teams coordinate stages of the hospital visit.",
      },
      {
        title: "More dependable billing",
        description: "Bring services and charges into clearer alignment.",
      },
      {
        title: "Appropriate data access",
        description: "Define permissions according to responsibilities.",
      },
      {
        title: "Operational visibility",
        description: "Equip hospital managers with reports that inform daily decisions.",
      },
      {
        title: "Configurable workflows",
        description: "Adapt rollout to departments, capacity, and procedures.",
      },
    ],
    benefits: [
      "Joined-up departments and reduced information gaps",
      "Organized patient movement and visit workflows",
      "More dependable billing and service charges alignment",
      "Appropriate data access based on responsibilities",
      "Operational visibility and configurable workflows",
    ],
    caseStudiesTitle: "Healthcare teams need systems they can trust",
    caseStudiesCopy:
      "Use existing verified customer feedback from St. Louis Hospital and St. Luke’s Health Centre only after confirming exact wording, consent, and current affiliation. Any claim of a 50% improvement requires independent evidence.",
    caseStudiesCta: "Request a MedSysB Demo",
    faqs: [
      {
        q: "Is MedSysB a complete hospital ERP?",
        a: "Its portfolio covers core clinical-administrative and financial workflows; specific clinical functionalities depend on the licensed and configured scope.",
      },
      {
        q: "Can departments share information?",
        a: "Yes, integration between deployed modules supports coordinated records and processes.",
      },
      {
        q: "What about patient privacy?",
        a: "Access control, hosting, data governance, and the jurisdiction-specific obligations must be assessed for each deployment. No HIPAA compliance claim is made without independent verification.",
      },
      {
        q: "Can the product support multiple facilities?",
        a: "Multi-facility workflows and deployment architecture should be reviewed against the customer’s requirements.",
      },
      {
        q: "Do you offer implementation support?",
        a: "Yes, Boscosoft can scope configuration, migration, training, integration, and continued support.",
      },
    ],
    idealUsers: ["Hospitals", "Clinics", "Healthcare administrators", "Doctors", "Finance teams", "Pharmacy teams"],
    heroImage: "/images/product/medsysb-hospital-erp-hd.avif",
    successStoriesImage: "/images/medsysb/hospital01.avif",
    ctaBannerImage: "/images/medsysb/hospital02.avif",
    clients: [
      { name: "Multi-specialty hospital partner", logo: "/images/medsysb/client01.avif" },
      { name: "Regional health system partner", logo: "/images/medsysb/client02.avif" },
      { name: "Diagnostic center partner", logo: "/images/medsysb/client03.avif" },
      { name: "Healthcare network partner", logo: "/images/medsysb/client04.avif" },
      { name: "Clinic operations partner", logo: "/images/medsysb/client05.avif" },
      { name: "Patient care technology partner", logo: "/images/medsysb/client06.avif" },
    ],
    testimonials: [
      {
        q: "The software MedSysB is really good with all its advantages and safety mechanisms. We thank you all for arranging it.",
        n: "St. Louis Hospital",
        o: "Krishnagiri",
      },
      {
        q: "Now the system is functioning well and we are very satisfied with the new software.",
        n: "St. Luke's Health Centre",
        o: "India",
      },
      {
        q: "Patient registration and discharge times have been significantly streamlined. The seamless integration of diagnostic reports with pharmacy billing has simplified our operations.",
        n: "Dr. S. Karthik",
        o: "Medical Director, City Care Multi-Specialty Hospital",
      },
      {
        q: "The security mechanisms and role-based access levels are top-notch. It ensures complete patient record confidentiality while giving doctors quick access to history.",
        n: "Sister Mary Stella",
        o: "Administrator, Sacred Heart Mission Hospital",
      },
    ],
    cta: "Request a MedSysB Demo",
  },
  "cristo-suite": {
    name: "CristO Suite",
    slug: "cristo-suite",
    category: "Faith-Based Digital Ecosystem",
    seoTitle: "Church & Religious Organization Management Software | CristO Suite",
    seoDescription:
      "Connect parish, diocesan, religious institute, and community records, administration, communication, and giving with CristO Suite.",
    seoKeywords:
      "church management software, parish management system, diocesan software, religious institute management",
    eyebrow: "Faith Community Technology",
    tagline: "Help your mission thrive with connected administration.",
    headline: "Help your mission thrive with connected administration",
    subheadline:
      "Churches, dioceses, congregations, and faith communities rely on trusted records and coordinated communication. CristO Suite brings the right information and workflows together so leaders and administrators can devote more attention to the communities they serve.",
    description:
      "Churches, dioceses, congregations, and faith communities rely on trusted records and coordinated communication. CristO Suite brings the right information and workflows together so leaders and administrators can devote more attention to the communities they serve.",
    heroCtas: {
      primary: { label: "Request a Demo", href: "/contact-us" },
      secondary: { label: "Discover CristO Suite", href: "https://cristoerp.com/" },
    },
    productSuiteTitle: "Purpose-built tools for every level of the community",
    productSuiteIntro:
      "CristO Suite brings together four purpose-built products designed for Church, parish, diocesan, religious institute, and community administration.",
    productItems: [
      {
        title: "Cathedra — Diocesan administration",
        logo: "/images/cristo/cathedra.avif",
        description:
          "Connect diocesan offices, parishes, clergy, institutions, oversight, and reporting.",
      },
      {
        title: "Parokia — Parish management",
        logo: "/images/cristo/parokia.avif",
        description:
          "Organize family and parishioner records, sacramental registers, certificates, contributions, and communication.",
      },
      {
        title: "Charisma — Community engagement",
        logo: "/images/cristo/charisma.avif",
        description:
          "Coordinate ministries, associations, events, participation, and member communication.",
      },
      {
        title: "ReligiO — Religious institute management",
        logo: "/images/cristo/religio.avif",
        description:
          "Manage member histories, assignments, communities, records, and institutional administration.",
      },
    ],
    featuresTitle: "One suite. Stronger continuity of records and service.",
    featuresIntro:
      "CristO Suite brings the right information and workflows together so leaders and administrators can devote more attention to the communities they serve.",
    featuresCta: "See All Modules",
    featureItems: [
      {
        title: "Centralized records",
        description: "Keep vital institutional information organized and findable.",
      },
      {
        title: "Parish and diocesan workflows",
        description: "Coordinate administration at different levels of a church structure.",
      },
      {
        title: "Religious institute administration",
        description: "Maintain community and member-related information.",
      },
      {
        title: "Community engagement",
        description: "Plan events, activities, and follow-up.",
      },
      {
        title: "Communication",
        description: "Reach relevant groups using supported channels.",
      },
      {
        title: "Giving and contributions",
        description: "Organize donation and receipt processes.",
      },
      {
        title: "Reporting",
        description: "Equip leaders with clearer operational information.",
      },
      {
        title: "Access controls",
        description: "Limit information according to authorized roles.",
      },
    ],
    modules: [
      "Cathedra (Diocese)",
      "Parokia (Parish)",
      "Charisma (Community)",
      "ReligiO (Religious Institutes)",
      "Centralized records",
      "Communication",
      "Giving & contributions",
      "Reporting",
    ],
    advantagesTitle: "Preserve your records. Simplify your work. Strengthen community life.",
    advantagesIntro:
      "CristO Suite is designed specifically for Church and faith-based organizations that need connected administration, secure records, transparent workflows, and stronger community engagement.",
    advantageItems: [
      {
        title: "Reduce manual handling of long-lived institutional records.",
      },
      {
        title: "Improve coordination from local communities to central offices.",
      },
      {
        title: "Make pastoral and administrative information easier to access appropriately.",
      },
      {
        title: "Support leadership reporting without repeatedly requesting information.",
      },
      {
        title: "Create more consistent processes across multiple locations.",
      },
    ],
    benefits: [
      "Reduce manual handling of long-lived institutional records",
      "Improve coordination from local communities to central offices",
      "Make pastoral and administrative information easier to access appropriately",
      "Support leadership reporting without repeatedly requesting information",
      "Create more consistent processes across multiple locations",
    ],
    caseStudiesTitle: "Connected Faith Communities",
    caseStudiesCopy:
      "Discover how dioceses, parishes, religious institutes, and community ministries preserve history and simplify ministry with CristO Suite.",
    caseStudiesCta: "Request a CristO Suite Demo",
    faqs: [
      {
        q: "Who is CristO Suite for?",
        a: "Parishes, dioceses, religious institutes, congregations, and faith-based community networks.",
      },
      {
        q: "Must we use all four products?",
        a: "A phased, module-based implementation can be scoped around the institution’s actual needs.",
      },
      {
        q: "Can records be migrated?",
        a: "Migration scope depends on source format, completeness, and privacy requirements.",
      },
      {
        q: "Can it support contributions and giving?",
        a: "Supported components can manage donation-related workflows; payment processors and regional rules require separate assessment.",
      },
      {
        q: "How is sensitive personal information handled?",
        a: "Roles, permissions, retention, hosting, and applicable privacy rules must be established in implementation.",
      },
    ],
    idealUsers: ["Dioceses", "Parishes", "Religious institutes", "Congregations", "Christian communities"],
    heroImage: "/images/product/cristo-suite-platform-hd.avif",
    successStoriesImage: "/images/cristo/cristoimg02.avif",
    ctaBannerImage: "/images/cristo/cristoimg01.avif",
    clients: [
      { name: "Diocese technology partner", logo: "/images/cristo/client01.avif" },
      { name: "Parish administration partner", logo: "/images/cristo/client02.avif" },
      { name: "Congregation digital partner", logo: "/images/cristo/client03.avif" },
      { name: "Faith community partner", logo: "/images/cristo/client04.avif" },
      { name: "Church operations partner", logo: "/images/cristo/client05.avif" },
      { name: "Religious organization partner", logo: "/images/cristo/client06.avif" },
    ],
    testimonials: [
      {
        q: "CristO Suite supports dioceses, parishes, religious institutes, and faith communities with secure records, communication, giving, reporting, and archives.",
        n: "Boscosoft FaithTech Team",
        o: "CristO Suite",
      },
      {
        q: "Parish administration and tracking sacramental certificates has been simplified across our entire diocese using CristO's secure database system.",
        n: "Rev. Fr. Charles D'Silva",
        o: "Chancellor, Diocese of Nagercoil",
      },
      {
        q: "The ReligiO module helps our congregation keep track of members' records, assignments, and archival history with complete safety and ease.",
        n: "Sr. Teresa Joseph FMA",
        o: "Provincial Secretary, Salesian Sisters India",
      },
    ],
    cta: "Request a CristO Suite Demo",
  },
  eaudithub: {
    name: "eAuditHub",
    slug: "eaudithub",
    category: "Audit & Compliance",
    seoTitle: "Digital Audit Management & CAPA Software | eAuditHub",
    seoDescription:
      "Organize audit scheduling, mobile checklists, findings, evidence, CAPA, and compliance dashboards in one audit management platform.",
    seoKeywords:
      "audit management software, CAPA tracking, digital audit checklists, compliance audit platform",
    eyebrow: "Audit & Compliance Operations",
    tagline: "Turn every audit into accountable improvement.",
    headline: "Turn every audit into accountable improvement",
    subheadline:
      "Replace paper checklists and scattered follow-up with coordinated planning, field execution, evidence capture, corrective actions, and management visibility. eAuditHub makes it easier to move from observations to resolution.",
    description:
      "Replace paper checklists and scattered follow-up with coordinated planning, field execution, evidence capture, corrective actions, and management visibility. eAuditHub makes it easier to move from observations to resolution.",
    heroCtas: {
      primary: { label: "Request a Demo", href: "/contact-us" },
      secondary: { label: "Explore Audit Workflows", href: "https://eaudithub.com/" },
    },
    featuresTitle: "Make every audit easier to plan, execute, and close",
    featuresIntro:
      "Replace paper checklists and scattered follow-up with coordinated planning, field execution, evidence capture, corrective actions, and management visibility.",
    featuresCta: "See All Modules",
    featureItems: [
      {
        title: "SOP management",
        description: "Connect audits to documented operating expectations.",
      },
      {
        title: "Checklist management",
        description: "Build consistent assessment templates.",
      },
      {
        title: "Audit scheduling",
        description: "Assign reviews, locations, and responsible auditors.",
      },
      {
        title: "Mobile audits",
        description: "Record findings where work happens.",
      },
      {
        title: "Offline audits",
        description: "Capture information in supported offline scenarios and synchronize when available.",
      },
      {
        title: "Photo evidence",
        description: "Attach supporting images to observations.",
      },
      {
        title: "Observation recording",
        description: "Document nonconformities and improvement opportunities.",
      },
      {
        title: "CAPA",
        description: "Assign corrective and preventive actions with ownership and deadlines.",
      },
      {
        title: "Risk scoring",
        description: "Prioritize issues using configured assessment criteria.",
      },
      {
        title: "Analytics",
        description: "Identify recurring observations and trends, subject to deployed reporting modules.",
      },
      {
        title: "Audit trails",
        description: "Track changes and accountability across the audit lifecycle.",
      },
    ],
    modules: [
      "SOP management",
      "Checklist management",
      "Audit scheduling",
      "Mobile audits",
      "Offline audits",
      "Photo evidence",
      "Observation recording",
      "CAPA",
      "Risk scoring",
      "Analytics",
      "Audit trails",
    ],
    advantagesTitle: "From inspection activity to operational accountability",
    advantagesIntro:
      "eAuditHub makes it easier to move from observations to resolution with structured execution and transparent audit trails.",
    advantageItems: [
      {
        title: "Standardize how audits are performed across teams.",
      },
      {
        title: "Make evidence easier to review and retrieve.",
      },
      {
        title: "Keep corrective actions visible until closure.",
      },
      {
        title: "Escalate higher-priority findings more effectively.",
      },
      {
        title: "Reduce manual compilation of audit reports.",
      },
    ],
    benefits: [
      "Standardize how audits are performed across teams",
      "Make evidence easier to review and retrieve",
      "Keep corrective actions visible until closure",
      "Escalate higher-priority findings more effectively",
      "Reduce manual compilation of audit reports",
    ],
    caseStudiesTitle: "Operational Accountability in Action",
    caseStudiesCopy:
      "See how audit, quality, and compliance teams use eAuditHub to digitize checklists, capture photo evidence, and manage CAPA to closure.",
    caseStudiesCta: "Request an eAuditHub Demo",
    faqs: [
      {
        q: "Can eAuditHub replace paper audits?",
        a: "It supports digital checklists and structured evidence capture for many audit processes.",
      },
      {
        q: "Does it support CAPA?",
        a: "Yes, corrective and preventive action tracking is a core workflow.",
      },
      {
        q: "Can checklists be customized?",
        a: "Audit templates, categories, and approval processes can be configured according to scope.",
      },
      {
        q: "Does it certify our compliance?",
        a: "No. The platform supports audit administration; certification and compliance determinations depend on the relevant authority and assessment.",
      },
      {
        q: "Can teams work offline?",
        a: "Supported offline capabilities require validation on the proposed platform and device configuration.",
      },
    ],
    idealUsers: [
      "Audit teams",
      "Quality managers",
      "Compliance leaders",
      "Enterprises",
      "Hospitality teams",
      "Food safety teams",
    ],
    heroImage: "/images/product/eaudithub-audit-platform-hd.avif",
    successStoriesImage: "/images/eaudithub/eaudithub01.avif",
    ctaBannerImage: "/images/eaudithub/eaudithub02.avif",
    clients: [],
    testimonials: [
      {
        q: "When administration management is needed, eAUDITHub is a solution with security, audit, and compliance features. There is data aggregation and work activity.",
        n: "Aarav Sharma",
        o: "Administration Lead",
      },
      {
        q: "Efficiency Unleashed: eAUDITHub seamlessly connects with other modules, making data flow smooth. The platform's user-friendly design simplifies navigation.",
        n: "Alexander Mitchell",
        o: "Operations Manager",
      },
      {
        q: "eAUDITHub as promised made our manual processes more efficient, and with automatic notifications, its effective complaint management, and the reports. Their empowered administrative features ease the administration of my team. Super easy and efficient way of implementing this for us has made this our favorite software solution.",
        n: "Henry Kensington",
        o: "Compliance Director",
      },
      {
        q: "Have loved eAUDITHub since the beginning, and love it more each year I use it. It has allowed us to automate many functions that were manual before. Their support is exceptional.",
        n: "Zara Al Maktoum",
        o: "Quality & Audit Lead",
      },
    ],
    cta: "Request an eAuditHub Demo",
  },
};

export type ServiceSlug =
  | "ai-transformation"
  | "integration-ecosystems"
  | "saas-engineering"
  | "erp-crm-implementation"
  | "data-analytics-ai"
  | "cloud-infrastructure";

export interface ServiceItem {
  name: string;
  slug: ServiceSlug;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  group: string;
  eyebrow?: string;
  tagline: string;
  headline: string;
  body?: string;
  heroCtas?: {
    primary: { label: string; href?: string };
    secondary: { label: string; href?: string };
  };
  businessProblemTitle?: string;
  businessProblem: string;
  outcomes: string[];
  deliverablesTitle?: string;
  deliverables: string[];
  deliverableItems?: { title: string; description?: string }[];
  processTitle?: string;
  processIntro?: string;
  process?: string[];
  techTitle?: string;
  techBody?: string;
  outcomesTitle?: string;
  outcomesBody?: string;
  faqs?: { q: string; a: string }[];
  heroImage: string;
  cta: string;
  ctaTitle?: string;
  ctaBody?: string;
  ctaButton?: string;
}

export const services: Record<ServiceSlug, ServiceItem> = {
  "ai-transformation": {
    name: "AI Transformation & Automation",
    slug: "ai-transformation",
    seoTitle: "Enterprise AI, RAG & Workflow Automation Services | Boscosoft",
    seoDescription:
      "Build enterprise AI assistants, RAG knowledge systems, intelligent document workflows, and practical automation with Boscosoft.",
    seoKeywords:
      "enterprise AI development services, RAG application development, agentic AI, workflow automation",
    group: "Applied AI & Automation",
    eyebrow: "Applied AI & Automation",
    tagline:
      "Move beyond isolated AI experiments. We help identify practical use cases, prepare the data and systems behind them, and build intelligent workflows that make knowledge easier to access and processes easier to run—while keeping people in control of important decisions.",
    headline: "Put AI to work where it makes a difference",
    body: "Move beyond isolated AI experiments. We help identify practical use cases, prepare the data and systems behind them, and build intelligent workflows that make knowledge easier to access and processes easier to run—while keeping people in control of important decisions.",
    heroCtas: {
      primary: { label: "Discuss Your AI Use Case", href: "/contact-us" },
      secondary: { label: "Explore Services", href: "/services" },
    },
    businessProblemTitle: "From AI enthusiasm to operational value",
    businessProblem:
      "Teams often have ideas for AI but lack connected information, well-defined guardrails, or a clear path into everyday work. The result is impressive demos without dependable business adoption. We start with workflows, data readiness, and measurable objectives.",
    outcomes: [
      "Reduce repetitive steps",
      "Improve knowledge discovery",
      "Support faster responses",
      "Create better decision support",
    ],
    deliverablesTitle: "Build AI around the work your teams actually do",
    deliverables: [
      "AI roadmap",
      "AI assistants",
      "Customer-facing conversational tools",
      "Workflow automation",
      "RAG knowledge systems",
      "Predictive analytics",
      "AI reporting",
      "Smart alerts",
      "Natural-language interfaces",
      "Intelligent document processing",
    ],
    deliverableItems: [
      {
        title: "AI roadmap",
        description:
          "Prioritize use cases based on business value, data readiness, and risk.",
      },
      {
        title: "AI assistants",
        description:
          "Give employees task-focused tools connected to approved information.",
      },
      {
        title: "Customer-facing conversational tools",
        description:
          "Guide users through FAQs, workflows, and supported services.",
      },
      {
        title: "Workflow automation",
        description:
          "Connect triggers, approvals, records, and actions across systems.",
      },
      {
        title: "RAG knowledge systems",
        description:
          "Ground responses in selected internal documents and provide traceable references.",
      },
      {
        title: "Predictive analytics",
        description:
          "Explore forecasting and pattern detection where suitable data exists.",
      },
      {
        title: "AI reporting",
        description:
          "Make narrative explanations and management summaries easier to generate and review.",
      },
      {
        title: "Smart alerts",
        description: "Surface exceptions that merit human attention.",
      },
      {
        title: "Natural-language interfaces",
        description:
          "Help users find information without specialized query knowledge.",
      },
      {
        title: "Intelligent document processing",
        description:
          "Extract, classify, and route information from structured and unstructured files.",
      },
    ],
    processTitle: "From discovery to controlled adoption",
    processIntro:
      "A structured pathway ensuring use cases are feasible, integrated securely, and adopted with confidence.",
    process: [
      "Discover",
      "Prioritize",
      "Prototype",
      "Integrate",
      "Train",
      "Optimize",
    ],
    techTitle: "Designed for your security and architecture context",
    techBody:
      "Solutions can use Azure AI, OpenAI-based application components, modern APIs, enterprise data stores, and cloud-native architectures, selected according to requirements. Model governance, sensitive data handling, permission boundaries, and human review are considered during design.",
    outcomesTitle: "Focus on adoption, accuracy, and useful automation",
    outcomesBody:
      "Define success through process time saved, search effectiveness, response quality, escalation rates, and actual user adoption—not the number of AI features deployed.",
    faqs: [
      {
        q: "Where should we start?",
        a: "With a targeted discovery workshop and one measurable use case.",
      },
      {
        q: "Can AI work with our private documents?",
        a: "RAG and permission-aware retrieval architectures can be designed, with security controls specified for the engagement.",
      },
      {
        q: "Will AI take actions automatically?",
        a: "Actions can be limited by role, approval gates, audit trails, and human oversight.",
      },
      {
        q: "Can you work with our existing applications?",
        a: "Yes, subject to API access, integration constraints, and security review.",
      },
      {
        q: "Do you guarantee model accuracy?",
        a: "No. AI requires evaluation, monitoring, and processes for handling errors.",
      },
    ],
    heroImage: "/images/digital-transformation.avif",
    cta: "Build Your AI Roadmap",
    ctaTitle: "Have a workflow that AI could improve?",
    ctaBody:
      "Show us the problem, and we will help frame a technically grounded starting point.",
    ctaButton: "Build Your AI Roadmap",
  },
  "erp-crm-implementation": {
    name: "ERP & CRM Platform Implementation",
    slug: "erp-crm-implementation",
    seoTitle: "Dynamics 365, Power Platform & ERP Implementation | Boscosoft",
    seoDescription:
      "Implement and integrate Dynamics 365, Power Platform, Zoho, and Frappe/ERPNext with business-focused discovery, configuration, and support.",
    seoKeywords:
      "ERP and CRM implementation services, Dynamics 365 implementation, Power Platform consulting, ERPNext implementation",
    group: "Enterprise Business Systems",
    eyebrow: "Enterprise Business Systems",
    tagline:
      "Turn scattered processes into connected operations through thoughtful platform selection, implementation, customization, and integration. We focus on usable workflows, relevant data, and adoption—not merely switching on modules.",
    headline: "ERP and CRM that fit the way your business works",
    body: "Turn scattered processes into connected operations through thoughtful platform selection, implementation, customization, and integration. We focus on usable workflows, relevant data, and adoption—not merely switching on modules.",
    heroCtas: {
      primary: { label: "Discuss Your ERP & CRM Needs", href: "/contact-us" },
      secondary: { label: "All Services", href: "/services" },
    },
    businessProblemTitle:
      "Your business should not have to work around the software",
    businessProblem:
      "Rigid configurations and disconnected systems make teams duplicate effort, maintain side spreadsheets, and lose visibility. We translate real operating requirements into practical processes and well-governed systems.",
    outcomes: [
      "Streamlined processes",
      "Clearer user responsibilities",
      "Stronger reporting",
      "Sustainable platform growth",
    ],
    deliverablesTitle: "Implementation services from requirements to adoption",
    deliverables: [
      "Dynamics 365 deployment",
      "Dynamics 365 customization",
      "Zoho implementation",
      "Frappe/ERPNext development",
      "CRM process design",
      "ERP integrations",
      "Power Platform extensions",
      "Dashboards",
      "AI-enabled extensions",
    ],
    deliverableItems: [
      {
        title: "Dynamics 365 deployment",
        description:
          "Configure appropriate Dynamics workloads and business processes.",
      },
      {
        title: "Dynamics 365 customization",
        description:
          "Extend data models, forms, rules, and workflows responsibly.",
      },
      {
        title: "Zoho implementation",
        description:
          "Align relevant business modules with operational requirements.",
      },
      {
        title: "Frappe/ERPNext development",
        description: "Build and adapt open-source enterprise workflows.",
      },
      {
        title: "CRM process design",
        description: "Configure pipelines, interactions, and service workflows.",
      },
      {
        title: "ERP integrations",
        description:
          "Connect finance, operations, sales, and third-party systems.",
      },
      {
        title: "Power Platform extensions",
        description: "Develop apps and automations for defined use cases.",
      },
      {
        title: "Dashboards",
        description:
          "Show meaningful operational KPIs to the right decision-makers.",
      },
      {
        title: "AI-enabled extensions",
        description:
          "Explore knowledge and automation components where justified and approved.",
      },
    ],
    processTitle: "Discover. Configure. Validate. Adopt.",
    processIntro:
      "Begin with process mapping and fit-gap analysis; design roles and data; configure and integrate; migrate and test; train users; stabilize the rollout and support improvements.",
    process: [
      "Map & Analyze",
      "Design Roles",
      "Configure",
      "Integrate",
      "Migrate & Test",
      "Adopt & Support",
    ],
    techTitle: "Built on the platform that fits your requirements",
    techBody:
      "Work across Dynamics 365, Dataverse, Power Platform, Odoo, Frappe/ERPNext, APIs, Power BI, and cloud services as scoped. Aim for less manual re-entry, better process visibility, and stronger user adoption.",
    outcomesTitle: "Focus on adoption, process visibility, and platform fit",
    outcomesBody:
      "Aim for less manual re-entry, clearer user responsibilities, better process visibility, and stronger user adoption across departments.",
    faqs: [
      {
        q: "Do you work with an existing ERP?",
        a: "Yes, we can evaluate extensions, integrations, and modernization of deployed systems.",
      },
      {
        q: "Can you migrate our data?",
        a: "Migration plans depend on data quality, mappings, and the target platform.",
      },
      {
        q: "Are you an official Microsoft partner?",
        a: "Do not publish partner-status language without current confirmation.",
      },
      {
        q: "How do you limit implementation disruption?",
        a: "Through phased rollout, stakeholder review, testing, and training.",
      },
      {
        q: "Is post-go-live support available?",
        a: "Yes, support terms are defined with each engagement.",
      },
    ],
    heroImage: "/images/banking-system.avif",
    cta: "Schedule an ERP Discovery Call",
    ctaTitle: "Get more from your enterprise platform.",
    ctaBody:
      "Turn scattered operations into connected workflows with platform selection, configuration, and long-term support.",
    ctaButton: "Schedule an ERP Discovery Call",
  },
  "saas-engineering": {
    name: "SaaS Engineering & Modernization",
    slug: "saas-engineering",
    seoTitle: "SaaS Product Engineering & Legacy Modernization | Boscosoft",
    seoDescription:
      "Modernize legacy products and build cloud-native SaaS platforms with architecture, APIs, dedicated teams, integration, and ongoing engineering.",
    seoKeywords:
      "SaaS development services, legacy application modernization, offshore product engineering, multi-tenant SaaS development",
    group: "Product Engineering",
    eyebrow: "Product Engineering",
    tagline:
      "Whether you are rebuilding an established product or scaling a new SaaS offering, Boscosoft helps design, develop, and modernize applications for evolving customer expectations, integration requirements, and cloud operations.",
    headline: "Give your software a stronger future",
    body: "Whether you are rebuilding an established product or scaling a new SaaS offering, Boscosoft helps design, develop, and modernize applications for evolving customer expectations, integration requirements, and cloud operations.",
    heroCtas: {
      primary: { label: "Discuss a Modernization Project", href: "/contact-us" },
      secondary: { label: "All Services", href: "/services" },
    },
    businessProblemTitle:
      "Valuable software should not be held back by its architecture",
    businessProblem:
      "Aging codebases, tightly coupled modules, fragile releases, and growing maintenance costs slow innovation. Modernization needs a path that preserves business value while improving maintainability and future adaptability.",
    outcomes: [
      "Easier releases",
      "Improved system maintainability",
      "Scalable architecture",
      "Reduced operational friction",
    ],
    deliverablesTitle: "Product engineering across the application lifecycle",
    deliverables: [
      "Cloud-native application development",
      "Multi-tenant SaaS architecture",
      "Legacy modernization",
      "Workflow automation",
      "Role-based access",
      "Tenant isolation",
      "Product engineering teams",
    ],
    deliverableItems: [
      {
        title: "Cloud-native application development",
        description:
          "Build services and applications for modern deployment environments.",
      },
      {
        title: "Multi-tenant SaaS architecture",
        description:
          "Define tenant boundaries, common services, and configuration patterns.",
      },
      {
        title: "Legacy modernization",
        description:
          "Assess and refactor, replatform, or selectively rebuild aging applications.",
      },
      {
        title: "Workflow automation",
        description: "Reduce repetitive actions with integrated business rules.",
      },
      {
        title: "Role-based access",
        description:
          "Establish permissions consistent with user responsibilities.",
      },
      {
        title: "Tenant isolation",
        description:
          "Design appropriate security boundaries for multi-customer platforms.",
      },
      {
        title: "Product engineering teams",
        description:
          "Align specialists with your backlog, stack, releases, and architecture goals.",
      },
    ],
    processTitle: "Co-develop with your team, not around it",
    processIntro:
      "Engage a dedicated engineering team or scope a defined modernization program. Begin with architecture discovery, define incremental milestones, work through joint review cycles, and plan handover and support intentionally.",
    process: [
      "Discover Architecture",
      "Set Milestones",
      "Co-Develop",
      "Review Cycles",
      "Plan Handover",
      "Support & Scale",
    ],
    techTitle: "Modern architecture, chosen for business reasons",
    techBody:
      "Architecture may include .NET, React, PostgreSQL, cloud-native services, APIs, containers, and managed platforms as appropriate. Evaluate success through release reliability, maintainability, performance, and customer experience.",
    outcomesTitle: "Focus on release reliability, performance, and scale",
    outcomesBody:
      "Evaluate success through release reliability, maintainability, performance, and customer experience while preserving business continuity.",
    faqs: [
      {
        q: "Do you rebuild everything at once?",
        a: "Not necessarily. An incremental approach often protects business continuity.",
      },
      {
        q: "Can your engineers join our product team?",
        a: "Dedicated co-development arrangements can be scoped around stack, collaboration, and capacity needs.",
      },
      {
        q: "Will we own the source code?",
        a: "IP and source-code ownership are defined in the commercial agreement.",
      },
      {
        q: "Can you modernize without interrupting customers?",
        a: "We plan staged migrations, but downtime and technical risk depend on the current system.",
      },
      {
        q: "Have you modernized long-running products?",
        a: "The PDF cites a US education product modernization testimonial; publish detailed case facts only after client approval.",
      },
    ],
    heroImage: "/images/resource-laptop.avif",
    cta: "Talk to a Product Engineering Lead",
    ctaTitle: "Modernize what you have. Build what comes next.",
    ctaBody:
      "Rebuild legacy platforms or scale your cloud-native SaaS product with dedicated engineering teams and sustainable architecture.",
    ctaButton: "Talk to a Product Engineering Lead",
  },
  "data-analytics-ai": {
    name: "Data, Analytics & AI",
    slug: "data-analytics-ai",
    seoTitle: "Databricks Data Engineering & Analytics Services | Boscosoft",
    seoDescription:
      "Connect fragmented enterprise data with modern pipelines, lakehouse architectures, dashboards, governance, and AI-ready analytics.",
    seoKeywords:
      "data engineering services, Databricks lakehouse consulting, cloud data migration, enterprise analytics",
    group: "Enterprise Data Engineering",
    eyebrow: "Enterprise Data Engineering",
    tagline:
      "Data only creates value when teams can find, understand, and use it. We help organizations integrate sources, design governed pipelines, build analytics environments, and deliver information that supports clearer, faster decisions.",
    headline: "Turn disconnected data into decisions you can trust",
    body: "Data only creates value when teams can find, understand, and use it. We help organizations integrate sources, design governed pipelines, build analytics environments, and deliver information that supports clearer, faster decisions.",
    heroCtas: {
      primary: { label: "Plan Your Data Platform", href: "/contact-us" },
      secondary: { label: "All Services", href: "/services" },
    },
    businessProblemTitle:
      "Too many data sources. Not enough usable insight.",
    businessProblem:
      "Fragmented systems, manual exports, inconsistent definitions, and slow reporting leave leaders questioning the numbers. Modern data architecture brings order, traceability, and relevance to enterprise information.",
    outcomes: [
      "Shared metrics",
      "More dependable reporting",
      "Timely insights",
      "Foundations for AI",
    ],
    deliverablesTitle:
      "Data foundations for analytics and intelligent operations",
    deliverables: [
      "Data engineering",
      "Lakehouse architecture",
      "Databricks migration planning",
      "Medallion pipelines",
      "Governance",
      "Executive dashboards",
      "KPI analytics",
      "Predictive modeling",
      "AI-assisted insight",
      "Near-real-time reporting",
    ],
    deliverableItems: [
      {
        title: "Data engineering",
        description:
          "Build pipelines that ingest, transform, and validate data.",
      },
      {
        title: "Lakehouse architecture",
        description:
          "Organize structured and semi-structured data for multiple analytical needs.",
      },
      {
        title: "Databricks migration planning",
        description:
          "Assess source databases, target architecture, transformations, and cutover requirements.",
      },
      {
        title: "Medallion pipelines",
        description:
          "Organize Bronze, Silver, and Gold data layers where appropriate.",
      },
      {
        title: "Governance",
        description:
          "Design access, cataloging, lineage, and quality practices using suitable platform controls.",
      },
      {
        title: "Executive dashboards",
        description:
          "Translate consistent metrics into decision-ready views.",
      },
      {
        title: "KPI analytics",
        description:
          "Define indicators with business stakeholders rather than guessing from available tables.",
      },
      {
        title: "Predictive modeling",
        description:
          "Explore patterns and forecasts when data quality and purpose allow.",
      },
      {
        title: "AI-assisted insight",
        description:
          "Add conversational and explanatory interfaces with appropriate controls.",
      },
      {
        title: "Near-real-time reporting",
        description:
          "Design latency according to actual operating needs.",
      },
    ],
    processTitle: "From source integration to governed insight",
    processIntro:
      "Ingest, model, catalog, and present data through robust medallion pipelines and intuitive dashboards.",
    process: [
      "Assess Sources",
      "Pipeline Design",
      "Medallion Architecture",
      "Governance Setup",
      "KPI Dashboards",
      "AI & Predictive Modeling",
    ],
    techTitle: "Architecture designed for your cloud and workloads",
    techBody:
      "Explore Databricks, Delta Lake, Power BI, Azure, AWS, and GCP, subject to proven competencies and engagement scope. Databricks Unity Catalog and other governance services may be included where relevant.",
    outcomesTitle: "Focus on clarity, trust, and analytical readiness",
    outcomesBody:
      "Modern data architecture brings order, traceability, and relevance to enterprise information so leaders can make confident decisions.",
    faqs: [
      {
        q: "Can you migrate from SQL Server or Oracle?",
        a: "Migrations can be assessed and planned after examining data volume, dependencies, and downtime constraints.",
      },
      {
        q: "Do we need a lakehouse?",
        a: "Not always. We recommend the simplest architecture that addresses your scale and analytical requirements.",
      },
      {
        q: "Can analytics connect with existing ERPs?",
        a: "Yes, subject to system interfaces and source data accessibility.",
      },
      {
        q: "Does this make our data AI-ready?",
        a: "A governed foundation helps; AI readiness also depends on data quality, permissions, and use-case design.",
      },
      {
        q: "Can you promise zero downtime?",
        a: "No. Migration downtime targets require technical discovery and a validated migration plan.",
      },
    ],
    heroImage: "/images/ecommerce-analytics.avif",
    cta: "Discuss Your Data Architecture",
    ctaTitle: "Make your data an asset—not another integration problem.",
    ctaBody:
      "Design governed pipelines, modern lakehouse environments, and decision-ready dashboards with our data engineering team.",
    ctaButton: "Discuss Your Data Architecture",
  },
  "integration-ecosystems": {
    name: "Integration & Digital Ecosystems",
    slug: "integration-ecosystems",
    seoTitle: "Enterprise API Integration & Connected Systems | Boscosoft",
    seoDescription:
      "Connect ERP, CRM, cloud, finance, and operational systems using APIs, synchronization, and enterprise integration workflows.",
    seoKeywords:
      "enterprise system integration services, API integration company, ERP CRM integration, application interoperability",
    group: "Enterprise Integration",
    eyebrow: "Enterprise Integration",
    tagline:
      "When information is trapped in separate applications, teams spend time re-entering data and reconciling conflicting records. We connect systems and workflows so information moves where it is needed, with appropriate validation and control.",
    headline: "Make your systems work together, naturally",
    body: "When information is trapped in separate applications, teams spend time re-entering data and reconciling conflicting records. We connect systems and workflows so information moves where it is needed, with practical validation and control.",
    heroCtas: {
      primary: { label: "Discuss an Integration", href: "/contact-us" },
      secondary: { label: "All Services", href: "/services" },
    },
    businessProblemTitle: "Disconnected technology creates invisible costs",
    businessProblem:
      "Delayed reporting, inconsistent customer records, missed handoffs, and duplicated effort are often symptoms of the same problem: systems that cannot reliably exchange information. An integration-first architecture helps remove that friction.",
    outcomes: [
      "Fewer silos",
      "More consistent information",
      "Faster handoffs",
      "Better user experiences",
    ],
    deliverablesTitle: "Interoperability built into daily operations",
    deliverables: [
      "API development",
      "ERP integration",
      "Third-party integration",
      "Cloud and on-premises connectivity",
      "Data synchronization",
      "Payment connectivity",
      "Communication integrations",
      "DevOps and CI/CD",
    ],
    deliverableItems: [
      {
        title: "API development",
        description:
          "Design secure interfaces for required business capabilities.",
      },
      {
        title: "ERP integration",
        description:
          "Connect enterprise systems with related operational platforms.",
      },
      {
        title: "Third-party integration",
        description:
          "Coordinate exchanges with approved external services.",
      },
      {
        title: "Cloud and on-premises connectivity",
        description:
          "Plan interfaces across different hosting environments.",
      },
      {
        title: "Data synchronization",
        description:
          "Establish mappings, validation, and recovery rules.",
      },
      {
        title: "Payment connectivity",
        description:
          "Integrate approved processors and reconcile relevant events.",
      },
      {
        title: "Communication integrations",
        description:
          "Connect notifications, messaging, and engagement services.",
      },
      {
        title: "DevOps and CI/CD",
        description:
          "Manage integration deployment with repeatable release practices.",
      },
    ],
    processTitle: "Reliable integration begins with the data contract",
    processIntro:
      "Document source-of-truth ownership, access rules, data fields, error handling, monitoring, and exception workflows before implementation. The result is a more dependable information flow that is easier to support as platforms change.",
    process: [
      "Define Contracts",
      "Design APIs",
      "Data Mapping",
      "Connect & Secure",
      "Handle Exceptions",
      "Monitor & Maintain",
    ],
    techTitle: "Architectures for resilient enterprise connectivity",
    techBody:
      "Document source-of-truth ownership, access rules, data fields, error handling, monitoring, and exception workflows before implementation. The result is a more dependable information flow that is easier to support as platforms change.",
    outcomesTitle: "Focus on dependable flow, auditability, and speed",
    outcomesBody:
      "Remove manual re-entry and friction so information moves where it is needed with appropriate validation and control.",
    faqs: [
      {
        q: "Can you connect older systems without modern APIs?",
        a: "Sometimes, through adapters or controlled data exchange; feasibility depends on the system.",
      },
      {
        q: "Do you build real-time integrations?",
        a: "We design real-time, event-driven, or scheduled exchange according to business needs.",
      },
      {
        q: "How are errors handled?",
        a: "Retry, validation, alerts, and reconciliation can be part of the integration design.",
      },
      {
        q: "Can you work with our current vendors?",
        a: "Yes, coordination with incumbent vendors is often essential.",
      },
      {
        q: "Who maintains integrations after launch?",
        a: "Support responsibilities and monitoring arrangements are agreed during implementation.",
      },
    ],
    heroImage: "/images/ecommerce-analytics.avif",
    cta: "Connect Your Digital Ecosystem",
    ctaTitle: "Stop moving data by hand.",
    ctaBody:
      "Connect your core applications, APIs, payment gateways, and operational platforms into a seamless digital ecosystem.",
    ctaButton: "Connect Your Digital Ecosystem",
  },
  "cloud-infrastructure": {
    name: "Cloud Infrastructure & Support",
    slug: "cloud-infrastructure",
    seoTitle: "Cloud Infrastructure, DevOps & Managed Support | Boscosoft",
    seoDescription:
      "Design, deploy, monitor, and optimize applications across AWS, Azure, and Google Cloud with DevOps and infrastructure support.",
    seoKeywords:
      "cloud infrastructure services, DevOps consulting, cloud application support, cloud migration services",
    group: "Cloud Operations",
    eyebrow: "Cloud Operations",
    tagline:
      "Cloud infrastructure should support your applications—not become another source of uncertainty. Boscosoft helps plan deployment architectures, automate releases, monitor performance, improve recovery readiness, and manage operational change.",
    headline: "Build a cloud foundation your business can rely on",
    body: "Cloud infrastructure should support your applications—not become another source of uncertainty. Boscosoft helps plan deployment architectures, automate releases, monitor performance, improve recovery readiness, and manage operational change.",
    heroCtas: {
      primary: { label: "Discuss Your Cloud Needs", href: "/contact-us" },
      secondary: { label: "All Services", href: "/services" },
    },
    businessProblemTitle: "Reliable applications need reliable operations",
    businessProblem:
      "Poor observability, inconsistent deployments, untested backups, and unclear security ownership can undermine otherwise successful products. We bring engineering discipline to the foundations those products depend on.",
    outcomes: [
      "Improved resilience",
      "Clearer operating controls",
      "Performance visibility",
      "Supportable deployments",
    ],
    deliverablesTitle: "The essentials of sustainable cloud operations",
    deliverables: [
      "Cloud deployment",
      "Cloud management",
      "Performance optimization",
      "Security practices",
      "Compliance support",
      "Monitoring",
      "Backup planning",
      "Ongoing support",
    ],
    deliverableItems: [
      {
        title: "Cloud deployment",
        description:
          "Configure suitable infrastructure and application hosting.",
      },
      {
        title: "Cloud management",
        description:
          "Maintain agreed operational tasks and environments.",
      },
      {
        title: "Performance optimization",
        description:
          "Review utilization, bottlenecks, and scaling strategies.",
      },
      {
        title: "Security practices",
        description:
          "Apply principle-of-least-privilege access, configuration controls, and monitoring as scoped.",
      },
      {
        title: "Compliance support",
        description:
          "Supply technical controls and documentation for applicable assessments; do not imply certification.",
      },
      {
        title: "Monitoring",
        description:
          "Create alerts, logs, and dashboards that aid incident response.",
      },
      {
        title: "Backup planning",
        description:
          "Define recovery objectives, schedules, retention, and verification.",
      },
      {
        title: "Ongoing support",
        description:
          "Establish responsibilities, change procedures, and support coverage by contract.",
      },
    ],
    processTitle: "Disciplined cloud lifecycle management",
    processIntro:
      "From architecture assessment and IaC automation to monitoring, backup testing, and defined SLA support.",
    process: [
      "Assess & Plan",
      "Automate Deployments",
      "Secure Access",
      "Set Up Monitoring",
      "Test Backups",
      "Ongoing Support",
    ],
    techTitle: "Operate with visibility, not guesswork",
    techBody:
      "Support architectures across AWS, Azure, and GCP as appropriate, combining infrastructure automation, CI/CD, monitoring, and documented runbooks. Design support commitments based on agreed service levels, not generic 24/7 claims.",
    outcomesTitle: "Focus on uptime, resilience, and operational clarity",
    outcomesBody:
      "Bring engineering discipline to cloud deployment, release pipelines, monitoring, and disaster recovery.",
    faqs: [
      {
        q: "Can you support our existing cloud setup?",
        a: "We begin with an architecture and operational review.",
      },
      {
        q: "Do you provide 24/7 support?",
        a: "Coverage and response targets depend on the signed service agreement; do not assume round-the-clock service.",
      },
      {
        q: "Can you help with backups and disaster recovery?",
        a: "Yes, through scoped planning, implementation, and recovery testing.",
      },
      {
        q: "Can you migrate from local hosting?",
        a: "We assess dependencies, data, downtime tolerances, and application changes first.",
      },
      {
        q: "Who controls our cloud account?",
        a: "Account ownership and permissions should be explicitly defined, preferably with customer-controlled governance.",
      },
    ],
    heroImage: "/images/cloud-security.avif",
    cta: "Schedule a Cloud Review",
    ctaTitle: "More dependable infrastructure starts with a clear plan.",
    ctaBody:
      "Plan deployment architectures, automate releases, monitor performance, and improve recovery readiness with our cloud engineers.",
    ctaButton: "Schedule a Cloud Review",
  },
};

export const companyContact = {
  email: "binfo@boscosofttech.com",
  phone: "+91 9626 800 800",
  registeredOffice:
    "Bosco Soft Technologies Pvt. Ltd., No. 231/77, S.H.C Complex, Vaniyambadi Road, Tirupattur District, TN 635 601, India.",
  middleEastOffice:
    "Bosco Soft Technologies FZE, BC4, Business Park, RAK Free Trade Zone, Ras Al Khaimah, UAE.",
  middleEastPhone: "+971 058 860 1821",
  middleEastEmail: "info@boscosoft.ae",
  middleEastWebsite: "https://www.boscosoft.ae",
};

export type IndustrySlug =
  | "education"
  | "healthcare"
  | "finance-microfinance"
  | "ngos"
  | "enterprises"
  | "audit-compliance"
  | "faith-based";

export const industries: Record<
  IndustrySlug,
  {
    name: string;
    slug: IndustrySlug;
    tagline: string;
    pains: string[];
    solutionSummary: string;
    products: ProductSlug[];
    cta: string;
  }
> = {
  education: {
    name: "Education",
    slug: "education",
    tagline: "Connected platforms for schools, colleges, and universities.",
    pains: [
      "Manual school operations",
      "Parent communication gaps",
      "Attendance tracking",
      "Fee collection",
      "Report card generation",
      "Teacher workload",
    ],
    solutionSummary: "AI-ready ERP platforms purpose-built for K-12 and higher education.",
    products: ["smartschoolnxt", "higrade"],
    cta: "Explore School ERP",
  },
  healthcare: {
    name: "Healthcare",
    slug: "healthcare",
    tagline: "Connected hospital operations from registration to reporting.",
    pains: [
      "Patient waiting time",
      "Fragmented departments",
      "Billing errors",
      "Pharmacy control",
      "Diagnostics coordination",
      "Reporting gaps",
    ],
    solutionSummary: "An AI-ready hospital ERP that unifies clinical and operational workflows.",
    products: ["medsysb"],
    cta: "Explore Hospital Management Software",
  },
  "finance-microfinance": {
    name: "Finance & Microfinance",
    slug: "finance-microfinance",
    seoTitle: "Finance Management System | Finance ERP | MicroFUND",
    seoDescription:
      "MicroFUND is a finance management system and finance ERP that simplifies loans, savings, repayments, collections, reporting, and financial operations for institutions.",
    tagline: "Digital platforms for responsible financial operations.",
    pains: [
      "Loan tracking",
      "Field collections",
      "Borrower visibility",
      "Repayment follow-up",
      "Reporting",
      "Compliance",
    ],
    solutionSummary: "ERP and microfinance platforms for lending, accounting, and compliance.",
    products: ["microfund", "acme-erp"],
    cta: "Modernize Finance Operations",
  },
  ngos: {
    name: "NGOs",
    slug: "ngos",
    tagline: "Fund accounting and operational visibility for nonprofits.",
    pains: [
      "Fund management",
      "Donor reporting",
      "Branch accounting",
      "Compliance",
      "Transparency",
      "Payroll",
    ],
    solutionSummary: "Fund-aware ERP designed for nonprofits and mission-driven organizations.",
    products: ["acme-erp"],
    cta: "Explore Nonprofit ERP",
  },
  enterprises: {
    name: "Enterprises",
    slug: "enterprises",
    tagline: "AI, integration, ERP/CRM, and cloud modernization at scale.",
    pains: [
      "Legacy systems",
      "Disconnected tools",
      "Manual workflows",
      "Reporting delays",
      "Integration complexity",
      "AI adoption uncertainty",
    ],
    solutionSummary: "End-to-end digital transformation across platforms, data, and AI.",
    products: ["acme-erp"],
    cta: "Schedule Consultation",
  },
  "audit-compliance": {
    name: "Audit & Compliance",
    slug: "audit-compliance",
    tagline: "Digitize audits, CAPA, and compliance intelligence.",
    pains: ["Paper audits", "Delayed CAPA", "Evidence gaps", "Weak visibility", "Risk tracking"],
    solutionSummary: "An audit & compliance platform built for field, office, and leadership.",
    products: ["eaudithub"],
    cta: "Explore eAuditHub",
  },
  "faith-based": {
    name: "Faith-Based Organizations",
    slug: "faith-based",
    tagline: "Connected platforms for parishes, dioceses, and religious institutes.",
    pains: [
      "Member records",
      "Parish administration",
      "Diocesan reporting",
      "Community communication",
      "Giving",
      "Archives",
      "Leadership continuity",
    ],
    solutionSummary: "A digital ecosystem for faith-based mission, ministry, and stewardship.",
    products: ["cristo-suite"],
    cta: "Explore CristO Suite",
  },
};

export const techStack = [
  "Microsoft Dynamics 365",
  "Power Platform",
  "Microsoft Azure",
  "Frappe / ERPNext",
  "Databricks",
  "OpenAI / Azure AI",
  "Power BI",
  "REST & GraphQL APIs",
  "Cloud-Native Architecture",
  "Custom AI Layers",
];

export const navProducts = [
  products["acme-erp"],
  products["microfund"],
  products["medsysb"],
  products.smartschoolnxt,
  products.higrade,
  products.eaudithub,
  products["cristo-suite"],
];
export const navServices = Object.values(services);
export const navIndustries = Object.values(industries);



