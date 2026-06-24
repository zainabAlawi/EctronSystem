const fs = require('fs');

const htmlFile = 'public/dashboard.html';
let html = fs.readFileSync(htmlFile, 'utf8');

const translations = require('./public/translations.js'); // Assuming I can require it if I add module.exports, but wait, it's a browser script.
// Let's just define the Arabic dictionary here to do the replacement.
const arDict = {
    "brand_name": "إكترون",
    "brand_sub": "بوابة إدارة الإنتاج",
    "menu_home": "الصفحة الرئيسية",
    "menu_docs": "المستندات",
    "menu_reports": "التقارير الشهرية",
    "menu_shifts": "إدارة الورديات",
    "menu_lines": "خطوط الإنتاج",
    "menu_users": "إدارة المستخدمين",
    "support": "الدعم الفني",
    "logout": "تسجيل الخروج",
    
    "top_home": "الرئيسية",
    "top_reports": "التقارير",
    "top_settings": "الإعدادات",

    "welcome": "مرحباً بك، المهندس أحمد",
    "date_time": "الأربعاء، 22 مايو 2024 | 09:42 ص",
    
    "kpi_water_title": "إجمالي إنتاج عدادات المياه الذكية Seconia",
    "kpi_water_sub": "عداد مياه ذكية",
    "kpi_single_title": "إجمالي إنتاج عدادات الكهرباء الذكية Single Phase",
    "kpi_three_title": "إجمالي إنتاج عدادات الكهرباء الذكية Three Phase",
    "kpi_unit": "وحدة",
    
    "chart_prod_title": "الإنتاج الحالي",
    "chart_prod_sub": "تحليل بيانات الإنتاج",
    "btn_daily": "يومي",
    "btn_weekly": "أسبوعي",
    "latest_updates": "آخر التحديثات",
    "update_1_b": "اكتمال طلبية رقم #4829",
    "update_1_span": "قبل دقيقتين",
    "update_2_b": "إيقاف مجدول للماكينة M-04",
    "update_2_span": "قبل 15 دقيقة",
    "update_3_b": "بداية وردية المهندس ياسر",
    "update_3_span": "قبل ساعة",
    "view_all": "عرض جميع السجلات",
    "quick_actions": "إجراءات سريعة",
    "action_add_read": "إضافة قراءة جديدة",
    "action_daily_report": "تقرير التصنيع اليومي",
    "action_contact_support": "تواصل مع الدعم الفني",
    
    "reports_title": "التقارير الشهرية",
    "reports_desc": "نظرة شاملة على أداء خطوط الإنتاج والتقييم - أكتوبر ٢٠٢٣",
    "btn_add_report": "إضافة تقرير",
    "kpi_accuracy": "معدل الدقة",
    "kpi_accuracy_sub": "ضمن معايير الجودة القياسية",
    "kpi_yearly": "إجمالي الإنتاج السنوي",
    "kpi_yearly_sub": "عداد كهرباء ذكي",
    "kpi_monthly": "إجمالي الإنتاج الشهري",
    "kpi_monthly_sub": "عداد منتج في هذا الشهر",
    "kpi_daily": "إجمالي الإنتاج اليومي",
    "kpi_daily_sub": "عداد منتج هذا اليوم",
    "kpi_meter_unit": "عداد",
    
    "lines_title": "خطوط الإنتاج",
    "lines_desc": "إدارة ومراقبة خطوط الإنتاج المختلفة",
    "line_mt212": "خط انتاج عدادات الكهرباء MT212",
    "line_ecs1100": "خط انتاج عدادات الكهرباء ECS1100",
    "line_siconia": "خط انتاج عدادات المياه Siconia",
    "line_inventory": "إدارة العهدة",
    "prod_stages": "مراحل الإنتاج",
    
    "users_title": "إدارة المستخدمين",
    "users_desc": "إدارة حسابات الموظفين وصلاحيات الدخول للنظام",
    "users_archive_title": "أرشيف الموظفين المحذوفين",
    "btn_archive": "الأرشيف",
    "btn_add_user": "إضافة موظف",
    "th_emp_id": "الرقم الوظيفي",
    "th_emp_name": "اسم الموظف",
    "th_emp_role": "الصلاحية",
    "th_emp_pass": "كلمة المرور",
    "th_emp_actions": "الإجراءات",
    "th_del_date": "تاريخ الحذف",
    
    "modal_add_title": "إضافة موظف جديد",
    "label_emp_id": "الرقم الوظيفي",
    "label_emp_name": "اسم الموظف",
    "label_emp_role": "الصلاحية",
    "role_operator": "مشغل",
    "role_supervisor": "مشرف",
    "role_admin": "أدمن",
    "role_quality": "إدارة الجودة",
    "label_emp_pass": "كلمة المرور",
    "btn_save_user": "حفظ بيانات الموظف"
};

// Insert script tag
if(!html.includes('translations.js')) {
    html = html.replace('<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>', '<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>\n    <script src="translations.js"></script>');
}

// Add data-i18n attributes
for (const [key, value] of Object.entries(arDict)) {
    // Regex to match >Value< and replace with data-i18n="key">Value<
    const regex1 = new RegExp(`>(\\s*)${value}(\\s*)<`, 'g');
    html = html.replace(regex1, ` data-i18n="${key}">$1${value}$2<`);
}

// Replace placeholders manually
html = html.replace('placeholder="بحث سريع..."', 'placeholder="بحث سريع..." data-i18n-placeholder="search_placeholder"');
html = html.replace('placeholder="أدخل الاسم الرباعي"', 'placeholder="أدخل الاسم الرباعي" data-i18n-placeholder="ph_emp_name"');
html = html.replace('placeholder="مثال: 100234"', 'placeholder="مثال: 100234" data-i18n-placeholder="ph_emp_id"');
html = html.replace('placeholder="••••••••"', 'placeholder="••••••••" data-i18n-placeholder="ph_emp_pass"');

fs.writeFileSync(htmlFile, html, 'utf8');
console.log('Done modifying dashboard.html');
