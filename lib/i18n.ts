export type Language = 'zh' | 'en' | 'ja' | 'ko' | 'fr' | 'es' | 'de' | 'pt' | 'it';

export interface Translations {
  // 通用
  common: {
    home: string;
    about: string;
    pricing: string;
    support: string;
    login: string;
    signup: string;
    logout: string;
    dashboard: string;
    profile: string;
    settings: string;
    tools: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    close: string;
    confirm: string;
    loading: string;
    error: string;
    success: string;
    back: string;
    next: string;
    previous: string;
    search: string;
    filter: string;
    export: string;
    import: string;
    copy: string;
    paste: string;
    cut: string;
    undo: string;
    redo: string;
    pagesUnit: string;
    adminBadge: string;
    upgradePlan: string;
    adminPanel: string;
    usageLabel: string;
    remaining: string;
    inviteReward: string;
    invitedCount: string;
    earnedPages: string;
    inviteCodeLabel: string;
    subscription: string;
  };
  
  // 导航栏
  navbar: {
    brand: string;
    features: string;
    pricing: string;
    support: string;
    login: string;
    signup: string;
    getStarted: string;
    noLoginRequired: string;
    aiToolsNeedPro: string;
    allTools: string;
  };
  
  // 首页
  home: {
    title: string;
    subtitle: string;
    description: string;
    startFree: string;
    learnMore: string;
    features: {
      aiExtraction: {
        title: string;
        description: string;
      };
      multiFormat: {
        title: string;
        description: string;
      };
      fastProcessing: {
        title: string;
        description: string;
      };
    };
    // 展示效果模块（从PDF提取到Excel）
    heroTitle: string;
    heroSubtitle: string;
    noCreditCard: string;
    pagesFree: string;
    dragDropHere: string;
    supportedFormats: string;
    browseFiles: string;
    tabInvoice: string;
    tabPurchaseOrder: string;
    tabQuotation: string;
    tabMore: string;
    tableInvoiceNo: string;
    tableDate: string;
    tableBillTo: string;
    tableAmount: string;
    tableTotal: string;
    requirementsLabel: string;
    requirementsPlaceholder: string;
    startConversion: string;
    optionDateFormat: string;
    optionAmountWithTax: string;
    optionFileHint: string;
    // 工作原理
    howItWorksTitle: string;
    howItWorksSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    // CTA 横幅
    ctaTitle: string;
  };
  // 页脚
  footer: {
    aiTools: string;
    aiPdfExtract: string;
    aiImageExtract: string;
    pdfTools: string;
    mergePdf: string;
    splitPdf: string;
    compressPdf: string;
    rotatePdf: string;
    printPdf: string;
    convertExport: string;
    excelToPdf: string;
    jpgToPdf: string;
    pdfToJpg: string;
    editTools: string;
    editPdf: string;
    extractPages: string;
    addPageNumber: string;
    addWatermark: string;
    deletePages: string;
    customerSupport: string;
    support: string;
    aboutUs: string;
    privacyPolicy: string;
    termsOfService: string;
  };
  
  // 登录页面
  login: {
    title: string;
    subtitle: string;
    email: string;
    password: string;
    loginButton: string;
    loggingIn: string;
    noAccount: string;
    signupPrompt: string;
    freeSignup: string;
    backToHome: string;
  };
  
  // 注册页面
  signup: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    password: string;
    inviteCode: string;
    inviteCodePlaceholder: string;
    inviteBonus: string;
    signupButton: string;
    signingUp: string;
    hasAccount: string;
    loginNow: string;
    backToHome: string;
    passwordMinLength: string;
  };
  
  // 仪表板
  dashboard: {
    title: string;
    subtitle: string;
    newConversation: string;
    noConversations: string;
    noConversationsDesc: string;
    startExtracting: string;
    conversation: string;
    fileCount: string;
    workbook: string;
    createTime: string;
    actions: string;
    view: string;
    delete: string;
    confirmDelete: string;
    pagination: string;
  };
  
  // 提取页面
  extract: {
    conversation: string;
    pagesUsed: string;
    upgrade: string;
    invite: string;
    newSession: string;
    dragDropFiles: string;
    clickToUpload: string;
    supportedFormats: string;
    parseRules: string;
    parseRulesPlaceholder: string;
    advancedRules: string;
    useAdvancedRules: string;
    clearRules: string;
    startConversion: string;
    processing: string;
    selectTemplate: string;
    saveAsTemplate: string;
    export: string;
    editConversationName: string;
    backToConversations: string;
  };
  
  // 工具栏
  toolbar: {
    undo: string;
    redo: string;
    copy: string;
    paste: string;
    cut: string;
    fontFamily: string;
    fontSize: string;
    bold: string;
    italic: string;
    underline: string;
    strikethrough: string;
    textColor: string;
    backgroundColor: string;
    alignLeft: string;
    alignCenter: string;
    alignRight: string;
    border: string;
    noBorder: string;
    allBorders: string;
    outerBorder: string;
    topBorder: string;
    bottomBorder: string;
    numberFormat: string;
    general: string;
    number: string;
    currency: string;
    percent: string;
    date: string;
    mergeCells: string;
    wrapText: string;
    decreaseIndent: string;
    increaseIndent: string;
    sortAsc: string;
    sortDesc: string;
    filter: string;
    sum: string;
    insertFunction: string;
  };
  
  // 定价页面
  pricing: {
    title: string;
    subtitle: string;
    free: {
      name: string;
      price: string;
      description: string;
      features: string[];
      button: string;
    };
    monthly: {
      name: string;
      price: string;
      description: string;
      features: string[];
      button: string;
      recommended: string;
    };
    yearly: {
      name: string;
      price: string;
      description: string;
      features: string[];
      button: string;
      bestValue: string;
    };
  };
  
  // 支付页面
  payment: {
    completeSubscription: string;
    selectPlan: string;
    orderInfo: string;
    total: string;
    paymentMethod: string;
    email: string;
    cardInfo: string;
    expiryDate: string;
    cardholderName: string;
    payNow: string;
    processing: string;
    backToPlans: string;
  };
  
  // 支付成功页面
  paymentSuccess: {
    title: string;
    subtitle: string;
    orderDetails: string;
    orderId: string;
    plan: string;
    amount: string;
    paymentMethod: string;
    paymentTime: string;
    status: string;
    completed: string;
    accountInfo: string;
    currentPlan: string;
    usage: string;
    used: string;
    remaining: string;
    startUsing: string;
    viewDashboard: string;
  };
  
  // 邀请功能
  invite: {
    title: string;
    subtitle: string;
    yourCode: string;
    inviteLink: string;
    copy: string;
    copied: string;
    statistics: string;
    inviteCount: string;
    earnedPages: string;
    rules: string;
    rule1: string;
    rule2: string;
    rule3: string;
  };
  
  // 升级对话框
  upgrade: {
    title: string;
    subtitle: string;
    monthly: {
      name: string;
      description: string;
      price: string;
      features: string[];
    };
    yearly: {
      name: string;
      description: string;
      price: string;
      features: string[];
    };
    redirectNote: string;
  };
  
  // 工具页面
  tools: {
    title: string;
    subtitle: string;
    categories: {
      aiTools: {
        name: string;
        description: string;
        badge: string;
      };
      pdfUtils: {
        name: string;
        description: string;
        badge: string;
      };
      convert: {
        name: string;
        description: string;
        badge: string;
      };
      edit: {
        name: string;
        description: string;
        badge: string;
      };
    };
    toolNames: {
      aiPdfExtract: string;
      aiImageExtract: string;
      pdfMerge: string;
      pdfSplit: string;
      pdfCompress: string;
      pdfRotate: string;
      pdfPrint: string;
      excelToPdf: string;
      jpgToPdf: string;
      pdfToJpg: string;
      pdfEdit: string;
      pdfExtractPages: string;
      pdfPageNumber: string;
      pdfWatermark: string;
      pdfDeletePages: string;
    };
    descriptions: {
      aiPdfExtract: string;
      aiImageExtract: string;
      pdfMerge: string;
      pdfSplit: string;
      pdfCompress: string;
      pdfRotate: string;
      pdfPrint: string;
      excelToPdf: string;
      jpgToPdf: string;
      pdfToJpg: string;
      pdfEdit: string;
      pdfExtractPages: string;
      pdfPageNumber: string;
      pdfWatermark: string;
      pdfDeletePages: string;
    };
    features: {
      easyToUse: string;
      easyToUseDesc: string;
      completelyFree: string;
      completelyFreeDesc: string;
      fastDownload: string;
      fastDownloadDesc: string;
      flexibleSplit: string;
      flexibleSplitDesc: string;
      maintainQuality: string;
      maintainQualityDesc: string;
      batchDownload: string;
      batchDownloadDesc: string;
    };
    actions: {
      selectFiles: string;
      selectFile: string;
      dragDropFiles: string;
      dragDropFile: string;
      clickToSelect: string;
      changeFile: string;
      clearAll: string;
      startMerge: string;
      startSplit: string;
      merging: string;
      splitting: string;
      processing: string;
      moveUp: string;
      moveDown: string;
      remove: string;
    };
    splitModes: {
      byPages: string;
      byPagesDesc: string;
      byRange: string;
      byRangeDesc: string;
      pagesPerFile: string;
      pageRanges: string;
      pageRangesPlaceholder: string;
      pageRangesHelp: string;
    };
    messages: {
      selectAtLeast2Files: string;
      mergeSuccess: string;
      splitSuccess: string;
      processingFailed: string;
      invalidFileOrRange: string;
      maxFileSize: string;
      selectedFiles: string;
    };
    upgrade: {
      title: string;
      subtitle: string;
      viewPricing: string;
    };
    pages: {
      excelToPdf: {
        title: string;
        subtitle: string;
        selectFile: string;
        supportedFormats: string;
        selectFileBtn: string;
        changeFile: string;
        noticeTitle: string;
        notice1: string;
        notice2: string;
        notice3: string;
        notice4: string;
        converting: string;
        startConvert: string;
        successMsg: string;
        errorMsg: string;
        multiSheetTitle: string;
        multiSheetDesc: string;
        keepFormatTitle: string;
        keepFormatDesc: string;
        quickConvertTitle: string;
        quickConvertDesc: string;
      };
      pdfRotate: {
        title: string;
        subtitle: string;
        selectFile: string;
        uploadDesc: string;
        selectFileBtn: string;
        changeFile: string;
        rotationLabel: string;
        rotate90Label: string;
        rotate180Label: string;
        rotate270Label: string;
        rotating: string;
        startRotate: string;
        successMsg: string;
        errorMsg: string;
        flexibleTitle: string;
        flexibleDesc: string;
        keepQualityTitle: string;
        keepQualityDesc: string;
        quickDownloadTitle: string;
        quickDownloadDesc: string;
      };
      jpgToPdf: {
        title: string;
        subtitle: string;
        selectFile: string;
        supportedFormats: string;
        selectFileBtn: string;
        clearAll: string;
        selectedCount: string;
        converting: string;
        convertToPdf: string;
        successMsg: string;
        errorMsg: string;
        uploadOneImage: string;
        card1Title: string;
        card1Desc: string;
        card2Title: string;
        card2Desc: string;
        card3Title: string;
        card3Desc: string;
      };
      pdfToJpg: {
        title: string;
        subtitle: string;
        selectFile: string;
        uploadDesc: string;
        selectFileBtn: string;
        changeFile: string;
        qualityLabel: string;
        qualityLow: string;
        qualityMedium: string;
        qualityHigh: string;
        qualityLowDesc: string;
        qualityMediumDesc: string;
        qualityHighDesc: string;
        converting: string;
        startConvert: string;
        successMsg: string;
        errorMsg: string;
        card1Title: string;
        card1Desc: string;
        card2Title: string;
        card2Desc: string;
        card3Title: string;
        card3Desc: string;
      };
      pdfPrint: {
        title: string;
        subtitle: string;
        selectFile: string;
        uploadDesc: string;
        selectFileBtn: string;
        changeFile: string;
        printButton: string;
        printHint: string;
        totalPages: string;
        pageRangeLabel: string;
        pageRangePlaceholder: string;
        copiesLabel: string;
        buildingPreview: string;
      };
      pdfEdit: { title: string; subtitle: string; comingSoon: string };
      pdfExtractPages: {
        title: string;
        subtitle: string;
        selectFile: string;
        uploadDesc: string;
        selectFileBtn: string;
        changeFile: string;
        totalPages: string;
        pageRangeLabel: string;
        pageRangePlaceholder: string;
        formatHelp: string;
        formatSingle: string;
        formatRange: string;
        formatMixed: string;
        extracting: string;
        startExtract: string;
        successMsg: string;
        errorMsg: string;
        invalidRange: string;
        readError: string;
        card1Title: string;
        card1Desc: string;
        card2Title: string;
        card2Desc: string;
        card3Title: string;
        card3Desc: string;
      };
      pdfPageNumber: {
        title: string;
        subtitle: string;
        selectFile: string;
        uploadDesc: string;
        selectFileBtn: string;
        changeFile: string;
        totalPages: string;
        positionLabel: string;
        positionBottomCenter: string;
        positionBottomRight: string;
        positionBottomLeft: string;
        positionTopCenter: string;
        positionTopRight: string;
        positionTopLeft: string;
        startNumberLabel: string;
        fontSizeLabel: string;
        previewTitle: string;
        previewPosition: string;
        previewStart: string;
        previewFontSize: string;
        previewRange: string;
        adding: string;
        startAdd: string;
        successMsg: string;
        errorMsg: string;
        readError: string;
        card1Title: string;
        card1Desc: string;
        card2Title: string;
        card2Desc: string;
        card3Title: string;
        card3Desc: string;
      };
      pdfWatermark: {
        title: string;
        subtitle: string;
        selectFile: string;
        uploadDesc: string;
        selectFileBtn: string;
        changeFile: string;
        totalPages: string;
        typeLabel: string;
        typeText: string;
        typeImage: string;
        typeTextDesc: string;
        typeImageDesc: string;
        textLabel: string;
        textPlaceholder: string;
        fontSizeLabel: string;
        imageLabel: string;
        selectImageHint: string;
        remove: string;
        opacityLabel: string;
        rotationLabel: string;
        adding: string;
        startAdd: string;
        successMsg: string;
        errorMsg: string;
        enterText: string;
        selectImage: string;
        readError: string;
        card1Title: string;
        card1Desc: string;
        card2Title: string;
        card2Desc: string;
        card3Title: string;
        card3Desc: string;
      };
      pdfDeletePages: {
        title: string;
        subtitle: string;
        selectFile: string;
        uploadDesc: string;
        selectFileBtn: string;
        changeFile: string;
        totalPages: string;
        noticeTitle: string;
        noticeDesc: string;
        pageRangeLabel: string;
        pageRangePlaceholder: string;
        formatHelp: string;
        formatSingle: string;
        formatRange: string;
        formatMixed: string;
        deleting: string;
        startDelete: string;
        successMsg: string;
        errorMsg: string;
        invalidRange: string;
        cannotDeleteAll: string;
        readError: string;
        card1Title: string;
        card1Desc: string;
        card2Title: string;
        card2Desc: string;
        card3Title: string;
        card3Desc: string;
      };
    };
  };
  
  // 支付失败页面
  paymentFailed: {
    title: string;
    subtitle: string;
    errorDetails: string;
    commonIssues: string;
    cardInfoError: string;
    cardInfoErrorDesc: string;
    insufficientFunds: string;
    insufficientFundsDesc: string;
    bankRestriction: string;
    bankRestrictionDesc: string;
    networkIssue: string;
    networkIssueDesc: string;
    testEnvironment: string;
    testEnvironmentDesc: string;
    retryPayment: string;
    selectOtherPlan: string;
    needHelp: string;
    needHelpDesc: string;
    contactSupport: string;
  };
  
  // 错误信息
  errors: {
    fileRequired: string;
    processingFailed: string;
    loginFailed: string;
    signupFailed: string;
    networkError: string;
    unauthorized: string;
    notFound: string;
    serverError: string;
    passwordMismatch: string;
  };

  // 账户设置页
  settings: {
    pageTitle: string;
    pageSubtitle: string;
    profile: string;
    security: string;
    notifications: string;
    dangerZone: string;
    personalInfo: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailReadonly: string;
    saveChanges: string;
    saving: string;
    currentPassword: string;
    currentPasswordPlaceholder: string;
    newPassword: string;
    newPasswordPlaceholder: string;
    confirmPassword: string;
    confirmPasswordPlaceholder: string;
    changePassword: string;
    changing: string;
    emailNotifications: string;
    emailNotificationsDesc: string;
    planExpiryReminder: string;
    planExpiryReminderDesc: string;
    usageReminder: string;
    usageReminderDesc: string;
    deleteAccount: string;
    deleteAccountDesc: string;
    deleteAccountButton: string;
    confirmDeleteTitle: string;
    confirmDeleteSubtitle: string;
    confirmDeleteBody: string;
    confirmDeleteList1: string;
    confirmDeleteList2: string;
    confirmDeleteList3: string;
    confirmDeleteList4: string;
    confirmDeleteButton: string;
    cancel: string;
    deleteConfirmPrompt: string;
    profileTab: string;
    securityTab: string;
    notificationsTab: string;
    dangerTab: string;
  };

  // 个人资料页
  profile: {
    pageTitle: string;
    pageSubtitle: string;
    basicInfo: string;
    edit: string;
    namePlaceholder: string;
    notSetName: string;
    planFree: string;
    planMonthly: string;
    planYearly: string;
  };
}

export const translations = {
  zh: {
    common: {
      home: '首页',
      about: '关于',
      pricing: '定价',
      support: '支持',
      login: '登录',
      signup: '注册',
      logout: '退出',
      dashboard: '仪表板',
      profile: '个人资料',
      settings: '设置',
      tools: '工具',
      save: '保存',
      cancel: '取消',
      delete: '删除',
      edit: '编辑',
      close: '关闭',
      confirm: '确认',
      loading: '加载中',
      error: '错误',
      success: '成功',
      back: '返回',
      next: '下一步',
      previous: '上一步',
      search: '搜索',
      filter: '筛选',
      export: '导出',
      import: '导入',
      copy: '复制',
      paste: '粘贴',
      cut: '剪切',
      undo: '撤销',
      redo: '重做',
      pagesUnit: '页',
      adminBadge: '管理员',
      upgradePlan: '升级套餐',
      adminPanel: '管理后台',
      usageLabel: '页面使用情况',
      remaining: '剩余',
      inviteReward: '邀请奖励',
      invitedCount: '已邀请',
      earnedPages: '获得',
      inviteCodeLabel: '邀请码',
      subscription: '订阅管理',
    },
    navbar: {
      brand: 'PDF Extract AI',
      features: '功能',
      pricing: '定价',
      support: '支持',
      login: '登录',
      signup: '注册',
      getStarted: '开始使用',
      noLoginRequired: '无需登录即可使用',
      aiToolsNeedPro: '需要订阅专业版',
      allTools: '所有工具',
    },
    home: {
      title: 'AI 驱动的 PDF 数据提取',
      subtitle: '智能提取 PDF 文档中的结构化数据',
      description: '使用先进的 AI 技术，快速准确地从 PDF 文档中提取表格、文本和数据，转换为可编辑的 Excel 格式。',
      startFree: '免费开始',
      learnMore: '了解更多',
      features: {
        aiExtraction: {
          title: 'AI 智能提取',
          description: '先进的机器学习算法，准确识别和提取文档结构',
        },
        multiFormat: {
          title: '多格式支持',
          description: '支持 PDF、图片等多种格式，输出 Excel、CSV 等格式',
        },
      fastProcessing: {
        title: '快速处理',
        description: '云端处理，秒级完成文档解析和数据提取',
      },
    },
    heroTitle: '从 PDF 中提取数据到您的 Excel',
    heroSubtitle: '通过 AI 去除 PDF 中无用的数据，AI 会根据你的需要内容进行提取数据',
    noCreditCard: '无需信用卡',
    pagesFree: '300 页免费',
    dragDropHere: '拖放文件到这里',
    supportedFormats: 'PDF / 图片 / JSON',
    browseFiles: '浏览文件',
    tabInvoice: '发票',
    tabPurchaseOrder: '采购单',
    tabQuotation: '报价单',
    tabMore: '更多...',
    tableInvoiceNo: '发票号码',
    tableDate: '日期',
    tableBillTo: '账单寄送至',
    tableAmount: '金额',
    tableTotal: '总计',
    requirementsLabel: '告诉我你的任何要求',
    requirementsPlaceholder: '例如：提取发票中的金额和日期',
    startConversion: '开始转换',
    optionDateFormat: '日期使用 YY-MM-DD 格式',
    optionAmountWithTax: '金额需要把税额也算上',
    optionFileHint: '在最后一列后面告诉我是哪个文件',
    howItWorksTitle: 'PDF Extract AI 工作原理',
    howItWorksSubtitle: '三步智能处理，让文档工作变得简单高效',
    step1Title: '智能识别文档内容',
    step1Desc: '结合大模型和 OCR 技术，精准识别 PDF、图片、Word 等各类文档中的文字、表格和结构信息',
    step2Title: '理解用户需求',
    step2Desc: '利用 LLM 的强大能力，深度理解您的自然语言指令，准确捕捉提取需求和数据格式要求',
    step3Title: '提取到 Excel',
    step3Desc: '将识别和理解的内容智能提取并结构化，生成你想要的 Excel 内容，可直接导出使用',
    ctaTitle: '准备好简化你的工作流程了吗？',
  },
  footer: {
    aiTools: 'AI 提取工具',
    aiPdfExtract: 'AI PDF 提取',
    aiImageExtract: 'AI 图片提取',
    pdfTools: 'PDF 常用工具',
    mergePdf: '合并 PDF',
    splitPdf: '拆分 PDF',
    compressPdf: '压缩 PDF',
    rotatePdf: '旋转 PDF',
    printPdf: '打印 PDF',
    convertExport: '转换与导出',
    excelToPdf: 'Excel 转 PDF',
    jpgToPdf: 'JPG 转 PDF',
    pdfToJpg: 'PDF 转 JPG',
    editTools: '编辑工具',
    editPdf: '编辑 PDF',
    extractPages: '提取页面',
    addPageNumber: '添加页码',
    addWatermark: '添加水印',
    deletePages: '删除页面',
    customerSupport: '客户支持',
    support: '支持',
    aboutUs: '关于我们',
    privacyPolicy: '隐私政策',
    termsOfService: '服务条款',
  },
  login: {
    title: '登录账户',
      subtitle: '已有账户？请登录继续使用',
      email: '邮箱',
      password: '密码',
      loginButton: '登录',
      loggingIn: '登录中...',
      noAccount: '还没有账户？',
      signupPrompt: '立即注册即可获得 300 页免费额度，无需信用卡',
      freeSignup: '免费注册',
      backToHome: '← 返回首页',
    },
    signup: {
      title: '注册',
      subtitle: '免费试用 300 页',
      name: '姓名',
      email: '邮箱',
      password: '密码',
      inviteCode: '邀请码（可选）',
      inviteCodePlaceholder: '输入邀请码获得额外 100 页',
      inviteBonus: '通过邀请注册，额外获得 100 页！',
      signupButton: '免费注册',
      signingUp: '注册中...',
      hasAccount: '已有账号？',
      loginNow: '立即登录',
      backToHome: '← 返回首页',
      passwordMinLength: '至少 6 位字符',
    },
    dashboard: {
      title: '对话',
      subtitle: '管理您的 AI 提取对话，已使用 {used} / {limit} 页',
      newConversation: '新建对话',
      noConversations: '还没有任何对话',
      noConversationsDesc: '开始您的第一个 AI 数据提取对话',
      startExtracting: '开始提取',
      conversation: '对话',
      fileCount: '文件数',
      workbook: '工作簿',
      createTime: '创建时间',
      actions: '操作',
      view: '查看',
      delete: '删除',
      confirmDelete: '确定要删除这个对话吗？',
      pagination: '每页显示：30   显示 1 - {count} 条，共 {total} 条',
    },
    extract: {
      conversation: '对话',
      pagesUsed: '已使用 {used} / {limit} 页',
      upgrade: '升级',
      invite: '邀请 100 页',
      newSession: '新建会话',
      dragDropFiles: '拖放文件到这里',
      clickToUpload: '点击或拖拽上传',
      supportedFormats: 'pdf·images·json',
      parseRules: '解析规则',
      parseRulesPlaceholder: 'Extract all line items from the invoice table ro...',
      advancedRules: '使用高级规则',
      useAdvancedRules: '已设置高级规则',
      clearRules: '清除规则',
      startConversion: '开始转换',
      processing: '处理中...',
      selectTemplate: '选择模版',
      saveAsTemplate: '保存为模版',
      export: '导出',
      editConversationName: '双击编辑对话名称',
      backToConversations: '返回对话列表',
    },
    toolbar: {
      undo: '撤销 (Ctrl+Z)',
      redo: '重做 (Ctrl+Y)',
      copy: '复制 (Ctrl+C)',
      paste: '粘贴 (Ctrl+V)',
      cut: '剪切 (Ctrl+X)',
      fontFamily: '字体',
      fontSize: '字号',
      bold: '粗体 (Ctrl+B)',
      italic: '斜体 (Ctrl+I)',
      underline: '下划线 (Ctrl+U)',
      strikethrough: '删除线',
      textColor: '文本颜色',
      backgroundColor: '背景颜色',
      alignLeft: '左对齐',
      alignCenter: '居中',
      alignRight: '右对齐',
      border: '边框',
      noBorder: '无边框',
      allBorders: '全部边框',
      outerBorder: '外边框',
      topBorder: '上边框',
      bottomBorder: '下边框',
      numberFormat: '数字格式',
      general: '常规',
      number: '数字',
      currency: '货币',
      percent: '百分比',
      date: '日期',
      mergeCells: '合并单元格',
      wrapText: '自动换行',
      decreaseIndent: '减少缩进',
      increaseIndent: '增加缩进',
      sortAsc: '升序排序',
      sortDesc: '降序排序',
      filter: '筛选',
      sum: '求和',
      insertFunction: '插入函数',
    },
    pricing: {
      title: '选择适合您的方案',
      subtitle: '灵活的定价方案，满足不同需求',
      free: {
        name: '免费版',
        price: '¥0',
        description: '适合个人用户试用',
        features: ['300 页免费额度', '基础 AI 提取', '标准处理速度', '社区支持'],
        button: '免费开始',
      },
      monthly: {
        name: '专业版',
        price: '$9.9',
        description: '适合有定期需求的专业人士',
        features: ['2000 页/月', '约 $0.005/页', '数据导出不限制', '优先支持'],
        button: '立即订阅',
        recommended: '推荐',
      },
      yearly: {
        name: '年度版',
        price: '$107',
        description: '适合重度使用的企业用户',
        features: ['20400 页/年', '约 $0.005/页', '数据导出不限制', '优先支持', '节省 10% 费用'],
        button: '立即订阅',
        bestValue: '最划算',
      },
    },
    payment: {
      completeSubscription: '完成订阅',
      selectPlan: '选择您的方案并完成支付',
      orderInfo: '订单信息',
      total: '总计',
      paymentMethod: '支付方式',
      email: '邮箱',
      cardInfo: '银行卡信息',
      expiryDate: '月份/年份',
      cardholderName: '持卡人姓名',
      payNow: '立即支付',
      processing: '处理中...',
      backToPlans: '查看所有方案',
    },
    paymentSuccess: {
      title: '支付成功！',
      subtitle: '感谢您的订阅，您的账户已成功升级',
      orderDetails: '订单详情',
      orderId: '订单号',
      plan: '订阅方案',
      amount: '支付金额',
      paymentMethod: '支付方式',
      paymentTime: '支付时间',
      status: '状态',
      completed: '已完成',
      accountInfo: '账户信息',
      currentPlan: '当前方案',
      usage: '使用情况',
      used: '已使用',
      remaining: '剩余',
      startUsing: '开始使用',
      viewDashboard: '查看仪表板',
    },
    invite: {
      title: '邀请好友',
      subtitle: '邀请好友注册，双方各得 100 页额度',
      yourCode: '您的邀请码',
      inviteLink: '邀请链接',
      copy: '复制',
      copied: '已复制！',
      statistics: '邀请统计',
      inviteCount: '已邀请人数',
      earnedPages: '获得页数',
      rules: '邀请规则',
      rule1: '好友通过您的邀请码注册成功后，双方各得 100 页',
      rule2: '邀请页数永久有效，不会过期',
      rule3: '邀请人数无上限，多邀多得',
    },
    upgrade: {
      title: '升级套餐',
      subtitle: '选择适合您的套餐，解锁更多功能',
      monthly: {
        name: '专业版',
        description: '适合有定期需求的专业人士',
        price: '$9.9',
        features: ['2000 页/月', '约 $0.005/页', '数据导出不限制', '优先支持'],
      },
      yearly: {
        name: '年度版',
        description: '适合长期使用的用户',
        price: '$107',
        features: ['20400 页/年', '约 $0.0052/页', '数据导出不限制', '优先支持', '节省 10% 费用'],
      },
      redirectNote: '选择套餐后将跳转到支付页面',
    },
    paymentFailed: {
      title: '支付失败',
      subtitle: '很抱歉，您的支付未能成功处理',
      errorDetails: '错误详情',
      commonIssues: '常见问题及解决方案',
      cardInfoError: '银行卡信息错误',
      cardInfoErrorDesc: '请检查银行卡号、有效期和CVC码是否正确',
      insufficientFunds: '余额不足',
      insufficientFundsDesc: '请确保您的银行卡有足够的余额',
      bankRestriction: '银行限制',
      bankRestrictionDesc: '某些银行可能限制在线支付，请联系您的银行',
      networkIssue: '网络问题',
      networkIssueDesc: '请检查网络连接并稍后重试',
      testEnvironment: '测试环境提示',
      testEnvironmentDesc: '当前为演示环境，您可以使用以下测试卡号：',
      retryPayment: '重新支付',
      selectOtherPlan: '选择其他方案',
      needHelp: '需要帮助？',
      needHelpDesc: '如果问题持续存在，请联系我们的客服团队',
      contactSupport: '联系客服',
    },
    tools: {
      title: 'PDF 工具集',
      subtitle: '强大的 PDF 处理工具，满足您的所有需求',
      categories: {
        aiTools: {
          name: 'AI 提取工具',
          description: '使用 AI 技术智能提取数据',
          badge: '付费',
        },
        pdfUtils: {
          name: 'PDF 实用工具',
          description: '常用的 PDF 处理工具',
          badge: '免费',
        },
        convert: {
          name: '转换与导出',
          description: '格式转换工具',
          badge: '免费',
        },
        edit: {
          name: '编辑工具',
          description: 'PDF 编辑和修改',
          badge: '免费',
        },
      },
      toolNames: {
        aiPdfExtract: 'AI PDF 提取',
        aiImageExtract: 'AI 图片提取',
        pdfMerge: '合并 PDF',
        pdfSplit: '拆分 PDF',
        pdfCompress: '压缩 PDF',
        pdfRotate: '旋转 PDF',
        pdfPrint: '打印 PDF',
        excelToPdf: 'Excel 转 PDF',
        jpgToPdf: 'JPG 转 PDF',
        pdfToJpg: 'PDF 转 JPG',
        pdfEdit: '编辑 PDF',
        pdfExtractPages: '提取页面',
        pdfPageNumber: '添加页码',
        pdfWatermark: '添加水印',
        pdfDeletePages: '删除页面',
      },
      descriptions: {
        aiPdfExtract: '智能提取 PDF 数据到 Excel',
        aiImageExtract: '从图片中提取结构化数据',
        pdfMerge: '将多个 PDF 合并为一个',
        pdfSplit: '将 PDF 拆分成多个文件',
        pdfCompress: '减小 PDF 文件大小',
        pdfRotate: '旋转 PDF 页面',
        pdfPrint: '打印 PDF 文档',
        excelToPdf: '将 Excel 转换为 PDF',
        jpgToPdf: '将图片转换为 PDF',
        pdfToJpg: '将 PDF 转换为图片',
        pdfEdit: '编辑 PDF 内容',
        pdfExtractPages: '提取 PDF 页面',
        pdfPageNumber: '为 PDF 添加页码',
        pdfWatermark: '为 PDF 添加水印',
        pdfDeletePages: '删除 PDF 页面',
      },
      features: {
        easyToUse: '简单易用',
        easyToUseDesc: '拖放文件即可合并，无需复杂操作',
        completelyFree: '完全免费',
        completelyFreeDesc: '无需注册，无限次使用',
        fastDownload: '快速下载',
        fastDownloadDesc: '合并完成后立即下载',
        flexibleSplit: '灵活拆分',
        flexibleSplitDesc: '支持按页数或指定范围拆分',
        maintainQuality: '保持质量',
        maintainQualityDesc: '拆分后保持原始 PDF 质量',
        batchDownload: '批量下载',
        batchDownloadDesc: '一次性下载所有拆分文件',
      },
      actions: {
        selectFiles: '选择 PDF 文件',
        selectFile: '选择文件',
        dragDropFiles: '拖放 PDF 文件到这里',
        dragDropFile: '选择 PDF 文件',
        clickToSelect: '或者点击下方按钮选择文件',
        changeFile: '更换文件',
        clearAll: '清空全部',
        startMerge: '合并 PDF',
        startSplit: '开始拆分',
        merging: '合并中...',
        splitting: '拆分中...',
        processing: '处理中...',
        moveUp: '上移',
        moveDown: '下移',
        remove: '删除',
      },
      splitModes: {
        byPages: '按页数拆分',
        byPagesDesc: '每 N 页拆分为一个文件',
        byRange: '按范围拆分',
        byRangeDesc: '指定页码范围拆分',
        pagesPerFile: '每个文件的页数',
        pageRanges: '页码范围',
        pageRangesPlaceholder: '例如: 1-3, 5, 7-10',
        pageRangesHelp: '使用逗号分隔多个范围，例如: 1-3, 5, 7-10',
      },
      messages: {
        selectAtLeast2Files: '请至少上传 2 个 PDF 文件',
        mergeSuccess: 'PDF 合并成功！文件已开始下载',
        splitSuccess: 'PDF 拆分成功！文件已开始下载',
        processingFailed: 'PDF 处理失败，请稍后重试',
        invalidFileOrRange: 'PDF 拆分失败，请检查文件和页码范围是否有效',
        maxFileSize: '支持多个文件，每个文件最大 50MB',
        selectedFiles: '已选择 {count} 个文件',
      },
      upgrade: {
        title: '需要更强大的功能？',
        subtitle: '升级到专业版，解锁 AI 智能提取功能',
        viewPricing: '查看定价',
      },
      pages: {
        excelToPdf: {
          title: 'Excel 转 PDF',
          subtitle: '将 Excel 转换为 PDF，完全免费',
          selectFile: '选择 Excel 文件',
          supportedFormats: '支持 .xlsx, .xls 格式',
          selectFileBtn: '选择文件',
          changeFile: '更换文件',
          noticeTitle: '转换说明',
          notice1: '支持多个工作表转换',
          notice2: '每个工作表转换为一页 PDF',
          notice3: '大表格会自动调整以适应页面',
          notice4: '超过 40 行的数据会被截断',
          converting: '转换中...',
          startConvert: '开始转换',
          successMsg: 'Excel 转 PDF 成功！文件已开始下载',
          errorMsg: 'Excel 转 PDF 失败，请检查文件是否有效',
          multiSheetTitle: '多工作表支持',
          multiSheetDesc: '自动转换所有工作表',
          keepFormatTitle: '保持格式',
          keepFormatDesc: '尽可能保持原始表格格式',
          quickConvertTitle: '快速转换',
          quickConvertDesc: '快速生成 PDF 文档',
        },
        pdfRotate: {
          title: '旋转 PDF',
          subtitle: '旋转 PDF 页面方向，完全免费',
          selectFile: '选择 PDF 文件',
          uploadDesc: '上传需要旋转的 PDF 文档',
          selectFileBtn: '选择文件',
          changeFile: '更换文件',
          rotationLabel: '旋转角度',
          rotate90Label: '顺时针 90°',
          rotate180Label: '180°',
          rotate270Label: '逆时针 90°',
          rotating: '旋转中...',
          startRotate: '开始旋转',
          successMsg: 'PDF 旋转成功！文件已开始下载',
          errorMsg: 'PDF 旋转失败，请检查文件是否有效',
          flexibleTitle: '灵活旋转',
          flexibleDesc: '支持 90°、180°、270° 旋转',
          keepQualityTitle: '保持质量',
          keepQualityDesc: '旋转后保持原始 PDF 质量',
          quickDownloadTitle: '快速下载',
          quickDownloadDesc: '旋转完成后立即下载',
        },
        jpgToPdf: {
          title: 'JPG 转 PDF',
          subtitle: '将图片转换为 PDF，完全免费',
          selectFile: '选择图片文件',
          supportedFormats: '支持 JPG、PNG 格式',
          selectFileBtn: '选择图片',
          clearAll: '清空全部',
          selectedCount: '已选择 {count} 张图片',
          converting: '转换中...',
          convertToPdf: '转换为 PDF',
          successMsg: '图片转 PDF 成功！文件已开始下载',
          errorMsg: '图片转 PDF 失败，请检查文件是否有效',
          uploadOneImage: '请至少上传一张图片',
          card1Title: '多图合并',
          card1Desc: '支持多张图片合并为一个 PDF',
          card2Title: '保持质量',
          card2Desc: '转换后保持原始图片质量',
          card3Title: '快速下载',
          card3Desc: '转换完成后立即下载',
        },
        pdfToJpg: {
          title: 'PDF 转 JPG',
          subtitle: '将 PDF 转换为图片，完全免费',
          selectFile: '选择 PDF 文件',
          uploadDesc: '上传需要转换的 PDF 文档',
          selectFileBtn: '选择文件',
          changeFile: '更换文件',
          qualityLabel: '图片质量',
          qualityLow: '标准质量',
          qualityMedium: '高质量',
          qualityHigh: '超高质量',
          qualityLowDesc: '较小文件',
          qualityMediumDesc: '平衡大小和质量',
          qualityHighDesc: '最佳效果',
          converting: '转换中...',
          startConvert: '开始转换',
          successMsg: 'PDF 转换成功！已生成 {count} 张图片',
          errorMsg: 'PDF 转 JPG 失败，请检查文件是否有效',
          card1Title: '高质量转换',
          card1Desc: '保持原始 PDF 的清晰度',
          card2Title: '批量下载',
          card2Desc: '所有页面打包为 ZIP 下载',
          card3Title: '多种质量',
          card3Desc: '根据需求选择图片质量',
        },
        pdfPrint: {
          title: '打印 PDF',
          subtitle: '打印 PDF 文档，完全免费',
          selectFile: '选择 PDF 文件',
          uploadDesc: '上传需要打印的 PDF 文档',
          selectFileBtn: '选择文件',
          changeFile: '更换文件',
          printButton: '打开打印',
          printHint: '点击下方按钮将打开浏览器打印对话框，选择打印机后即可打印。',
          totalPages: '共 {total} 页',
          pageRangeLabel: '打印页范围',
          pageRangePlaceholder: '全部或输入范围，如 1-3,5,7-10',
          copiesLabel: '打印份数',
          buildingPreview: '生成打印预览中…',
        },
        pdfEdit: { title: '编辑 PDF', subtitle: '编辑 PDF 内容，完全免费', comingSoon: '功能开发中，敬请期待...' },
        pdfExtractPages: {
          title: '提取页面',
          subtitle: '提取 PDF 指定页面，完全免费',
          selectFile: '选择 PDF 文件',
          uploadDesc: '上传需要提取页面的 PDF 文档',
          selectFileBtn: '选择文件',
          changeFile: '更换文件',
          totalPages: '总共 {total} 页',
          pageRangeLabel: '页面范围',
          pageRangePlaceholder: '例如: 1,3,5-8,10',
          formatHelp: '支持格式：',
          formatSingle: '单页：1,3,5',
          formatRange: '范围：1-5,8-10',
          formatMixed: '混合：1,3-5,8,10-12',
          extracting: '提取中...',
          startExtract: '提取页面',
          successMsg: '成功提取 {count} 页！文件已开始下载',
          errorMsg: '页面提取失败，请检查文件和页面范围',
          invalidRange: '请输入有效的页面范围',
          readError: '无法读取 PDF 文件',
          card1Title: '灵活提取',
          card1Desc: '支持单页和范围提取',
          card2Title: '保持质量',
          card2Desc: '原始质量无损提取',
          card3Title: '快速处理',
          card3Desc: '快速生成新的 PDF',
        },
        pdfPageNumber: {
          title: '添加页码',
          subtitle: '为 PDF 添加页码，完全免费',
          selectFile: '选择 PDF 文件',
          uploadDesc: '上传需要添加页码的 PDF 文档',
          selectFileBtn: '选择文件',
          changeFile: '更换文件',
          totalPages: '总共 {total} 页',
          positionLabel: '页码位置',
          positionBottomCenter: '底部居中',
          positionBottomRight: '底部右侧',
          positionBottomLeft: '底部左侧',
          positionTopCenter: '顶部居中',
          positionTopRight: '顶部右侧',
          positionTopLeft: '顶部左侧',
          startNumberLabel: '起始页码',
          fontSizeLabel: '字体大小',
          previewTitle: '预览设置',
          previewPosition: '位置',
          previewStart: '起始页码',
          previewFontSize: '字体大小',
          previewRange: '页码范围',
          adding: '添加中...',
          startAdd: '添加页码',
          successMsg: '成功为 {count} 页添加页码！文件已开始下载',
          errorMsg: '添加页码失败，请检查文件是否有效',
          readError: '无法读取 PDF 文件',
          card1Title: '灵活定位',
          card1Desc: '支持6种页码位置选择',
          card2Title: '自定义起始',
          card2Desc: '可设置任意起始页码',
          card3Title: '字体调节',
          card3Desc: '可调节页码字体大小',
        },
        pdfWatermark: {
          title: '添加水印',
          subtitle: '为 PDF 添加文字或图片水印，完全免费',
          selectFile: '选择 PDF 文件',
          uploadDesc: '上传需要添加水印的 PDF 文档',
          selectFileBtn: '选择文件',
          changeFile: '更换文件',
          totalPages: '总共 {total} 页',
          typeLabel: '水印类型',
          typeText: '文字水印',
          typeImage: '图片水印',
          typeTextDesc: '添加文字水印',
          typeImageDesc: '添加图片水印',
          textLabel: '水印文字',
          textPlaceholder: '输入水印文字',
          fontSizeLabel: '字体大小',
          imageLabel: '水印图片',
          selectImageHint: '点击选择图片 (PNG, JPG)',
          remove: '删除',
          opacityLabel: '透明度',
          rotationLabel: '旋转角度',
          adding: '添加中...',
          startAdd: '添加水印',
          successMsg: '成功为 {count} 页添加水印！文件已开始下载',
          errorMsg: '添加水印失败',
          enterText: '请输入水印文字',
          selectImage: '请选择水印图片',
          readError: '无法读取 PDF 文件',
          card1Title: '文字水印',
          card1Desc: '支持自定义文字和字体大小',
          card2Title: '图片水印',
          card2Desc: '支持 PNG 和 JPG 图片格式',
          card3Title: '自定义样式',
          card3Desc: '可调节透明度和旋转角度',
        },
        pdfDeletePages: {
          title: '删除页面',
          subtitle: '删除 PDF 指定页面，完全免费',
          selectFile: '选择 PDF 文件',
          uploadDesc: '上传需要删除页面的 PDF 文档',
          selectFileBtn: '选择文件',
          changeFile: '更换文件',
          totalPages: '总共 {total} 页',
          noticeTitle: '注意事项',
          noticeDesc: '删除操作不可逆，请确认要删除的页面范围。不能删除所有页面。',
          pageRangeLabel: '要删除的页面范围',
          pageRangePlaceholder: '例如: 1,3,5-8,10',
          formatHelp: '支持格式：',
          formatSingle: '单页：1,3,5',
          formatRange: '范围：1-5,8-10',
          formatMixed: '混合：1,3-5,8,10-12',
          deleting: '删除中...',
          startDelete: '删除页面',
          successMsg: '成功删除 {deleted} 页！剩余 {remaining} 页',
          errorMsg: '页面删除失败，请检查文件和页面范围',
          invalidRange: '请输入有效的页面范围',
          cannotDeleteAll: '不能删除所有页面',
          readError: '无法读取 PDF 文件',
          card1Title: '精确删除',
          card1Desc: '支持单页和范围删除',
          card2Title: '保持质量',
          card2Desc: '剩余页面质量不变',
          card3Title: '安全操作',
          card3Desc: '防止删除所有页面',
        },
      },
    },
    errors: {
      fileRequired: '请选择文件',
      processingFailed: '处理失败，请稍后重试',
      loginFailed: '登录失败，请稍后重试',
      signupFailed: '注册失败，请稍后重试',
      networkError: '网络错误，请检查网络连接',
      unauthorized: '未授权，请重新登录',
      notFound: '页面未找到',
      serverError: '服务器错误，请稍后重试',
      passwordMismatch: '新密码和确认密码不一致',
    },
    settings: {
      pageTitle: '账户设置',
      pageSubtitle: '管理您的账户安全和偏好设置',
      profile: '个人信息',
      security: '安全设置',
      notifications: '通知设置',
      dangerZone: '危险操作',
      personalInfo: '个人信息',
      name: '姓名',
      namePlaceholder: '请输入您的姓名',
      email: '邮箱地址',
      emailReadonly: '邮箱地址不可修改',
      saveChanges: '保存更改',
      saving: '保存中...',
      currentPassword: '当前密码',
      currentPasswordPlaceholder: '请输入当前密码',
      newPassword: '新密码',
      newPasswordPlaceholder: '请输入新密码（至少6位）',
      confirmPassword: '确认新密码',
      confirmPasswordPlaceholder: '请再次输入新密码',
      changePassword: '修改密码',
      changing: '修改中...',
      emailNotifications: '邮件通知',
      emailNotificationsDesc: '接收账户相关的重要邮件通知',
      planExpiryReminder: '套餐到期提醒',
      planExpiryReminderDesc: '在套餐即将到期时发送提醒',
      usageReminder: '使用量提醒',
      usageReminderDesc: '当页面使用量达到80%时发送提醒',
      deleteAccount: '删除账户',
      deleteAccountDesc: '删除您的账户将永久移除所有数据，包括文档、订阅信息等。此操作不可恢复。',
      deleteAccountButton: '删除我的账户',
      confirmDeleteTitle: '确认删除账户',
      confirmDeleteSubtitle: '此操作不可恢复',
      confirmDeleteBody: '您确定要删除账户吗？这将永久删除您的所有数据，包括：',
      confirmDeleteList1: '所有已处理的文档',
      confirmDeleteList2: '订阅和支付信息',
      confirmDeleteList3: '邀请记录和奖励',
      confirmDeleteList4: '个人设置和偏好',
      confirmDeleteButton: '确认删除',
      cancel: '取消',
      deleteConfirmPrompt: '确定要删除账户吗？此操作不可恢复！',
      profileTab: '个人信息',
      securityTab: '安全设置',
      notificationsTab: '通知设置',
      dangerTab: '危险操作',
    },
    profile: {
      pageTitle: '个人资料',
      pageSubtitle: '管理您的账户信息和订阅详情',
      basicInfo: '基本信息',
      edit: '编辑',
      namePlaceholder: '请输入姓名',
      notSetName: '未设置姓名',
      planFree: '免费版',
      planMonthly: '专业版',
      planYearly: '年度版',
    },
  },
  en: {
    common: {
      home: 'Home',
      about: 'About',
      pricing: 'Pricing',
      support: 'Support',
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout',
      dashboard: 'Dashboard',
      profile: 'Profile',
      settings: 'Settings',
      tools: 'Tools',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      confirm: 'Confirm',
      loading: 'Loading',
      error: 'Error',
      success: 'Success',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      search: 'Search',
      filter: 'Filter',
      export: 'Export',
      import: 'Import',
      copy: 'Copy',
      paste: 'Paste',
      cut: 'Cut',
      undo: 'Undo',
      redo: 'Redo',
      pagesUnit: 'pages',
      adminBadge: 'Admin',
      upgradePlan: 'Upgrade',
      adminPanel: 'Admin Panel',
      usageLabel: 'Usage',
      remaining: 'Remaining',
      inviteReward: 'Invite Rewards',
      invitedCount: 'Invited',
      earnedPages: 'Earned',
      inviteCodeLabel: 'Invite Code',
      subscription: 'Subscription',
    },
    navbar: {
      brand: 'PDF Extract AI',
      features: 'Features',
      pricing: 'Pricing',
      support: 'Support',
      login: 'Login',
      signup: 'Sign Up',
      getStarted: 'Get Started',
      noLoginRequired: 'No login required',
      aiToolsNeedPro: 'AI tools require Pro subscription',
      allTools: 'All Tools',
    },
    home: {
      title: 'AI-Powered PDF Data Extraction',
      subtitle: 'Intelligently extract structured data from PDF documents',
      description: 'Use advanced AI technology to quickly and accurately extract tables, text, and data from PDF documents, converting them to editable Excel format.',
      startFree: 'Start Free',
      learnMore: 'Learn More',
      features: {
        aiExtraction: {
          title: 'AI Smart Extraction',
          description: 'Advanced machine learning algorithms for accurate document structure recognition and extraction',
        },
        multiFormat: {
          title: 'Multi-Format Support',
          description: 'Support PDF, images and other formats, output to Excel, CSV and more',
        },
      fastProcessing: {
        title: 'Fast Processing',
        description: 'Cloud processing, complete document parsing and data extraction in seconds',
      },
    },
    heroTitle: 'Extract data from PDF to your Excel',
    heroSubtitle: 'AI removes useless data from PDF and extracts data according to your needs',
    noCreditCard: 'No credit card required',
    pagesFree: '300 pages free',
    dragDropHere: 'Drag and drop files here',
    supportedFormats: 'PDF / Images / JSON',
    browseFiles: 'Browse files',
    tabInvoice: 'Invoice',
    tabPurchaseOrder: 'Purchase Order',
    tabQuotation: 'Quotation',
    tabMore: 'More...',
    tableInvoiceNo: 'Invoice No.',
    tableDate: 'Date',
    tableBillTo: 'Bill To',
    tableAmount: 'Amount',
    tableTotal: 'Total',
    requirementsLabel: 'Tell me your requirements',
    requirementsPlaceholder: 'e.g. Extract amount and date from invoice',
    startConversion: 'Start Conversion',
    optionDateFormat: 'Use YY-MM-DD for date',
    optionAmountWithTax: 'Amount includes tax',
    optionFileHint: 'Tell me which file after the last column',
    howItWorksTitle: 'How PDF Extract AI Works',
    howItWorksSubtitle: 'Three-step intelligent processing for simple, efficient document work',
    step1Title: 'Smart document recognition',
    step1Desc: 'Combining LLM and OCR to accurately identify text, tables and structure in PDFs, images, Word and more',
    step2Title: 'Understand your needs',
    step2Desc: 'Using LLM to deeply understand natural language instructions and capture extraction and format requirements',
    step3Title: 'Extract to Excel',
    step3Desc: 'Intelligently extract and structure content, generate the Excel you want, and export directly',
    ctaTitle: 'Ready to simplify your workflow?',
  },
  footer: {
    aiTools: 'AI Extraction Tools',
    aiPdfExtract: 'AI PDF Extraction',
    aiImageExtract: 'AI Image Extraction',
    pdfTools: 'Common PDF Tools',
    mergePdf: 'Merge PDF',
    splitPdf: 'Split PDF',
    compressPdf: 'Compress PDF',
    rotatePdf: 'Rotate PDF',
    printPdf: 'Print PDF',
    convertExport: 'Convert & Export',
    excelToPdf: 'Excel to PDF',
    jpgToPdf: 'JPG to PDF',
    pdfToJpg: 'PDF to JPG',
    editTools: 'Editing Tools',
    editPdf: 'Edit PDF',
    extractPages: 'Extract Pages',
    addPageNumber: 'Add Page Numbers',
    addWatermark: 'Add Watermark',
    deletePages: 'Delete Pages',
    customerSupport: 'Customer Support',
    support: 'Support',
    aboutUs: 'About Us',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
  },
  login: {
    title: 'Login to Account',
      subtitle: 'Already have an account? Please login to continue',
      email: 'Email',
      password: 'Password',
      loginButton: 'Login',
      loggingIn: 'Logging in...',
      noAccount: "Don't have an account?",
      signupPrompt: 'Sign up now to get 300 free pages, no credit card required',
      freeSignup: 'Free Sign Up',
      backToHome: '← Back to Home',
    },
    signup: {
      title: 'Sign Up',
      subtitle: 'Free trial with 300 pages',
      name: 'Name',
      email: 'Email',
      password: 'Password',
      inviteCode: 'Invite Code (Optional)',
      inviteCodePlaceholder: 'Enter invite code for extra 100 pages',
      inviteBonus: 'Sign up with invite code, get extra 100 pages!',
      signupButton: 'Free Sign Up',
      signingUp: 'Signing up...',
      hasAccount: 'Already have an account?',
      loginNow: 'Login Now',
      backToHome: '← Back to Home',
      passwordMinLength: 'At least 6 characters',
    },
    dashboard: {
      title: 'Conversations',
      subtitle: 'Manage your AI extraction conversations, used {used} / {limit} pages',
      newConversation: 'New Conversation',
      noConversations: 'No conversations yet',
      noConversationsDesc: 'Start your first AI data extraction conversation',
      startExtracting: 'Start Extracting',
      conversation: 'Conversation',
      fileCount: 'Files',
      workbook: 'Workbook',
      createTime: 'Created',
      actions: 'Actions',
      view: 'View',
      delete: 'Delete',
      confirmDelete: 'Are you sure you want to delete this conversation?',
      pagination: 'Per page: 30   Showing 1 - {count} of {total}',
    },
    extract: {
      conversation: 'Conversation',
      pagesUsed: 'Used {used} / {limit} pages',
      upgrade: 'Upgrade',
      invite: 'Invite 100 Pages',
      newSession: 'New Session',
      dragDropFiles: 'Drag and drop files here',
      clickToUpload: 'Click or drag to upload',
      supportedFormats: 'pdf·images·json',
      parseRules: 'Parse Rules',
      parseRulesPlaceholder: 'Extract all line items from the invoice table ro...',
      advancedRules: 'Use Advanced Rules',
      useAdvancedRules: 'Advanced rules set',
      clearRules: 'Clear Rules',
      startConversion: 'Start Conversion',
      processing: 'Processing...',
      selectTemplate: 'Select Template',
      saveAsTemplate: 'Save as Template',
      export: 'Export',
      editConversationName: 'Double-click to edit conversation name',
      backToConversations: 'Back to Conversations',
    },
    toolbar: {
      undo: 'Undo (Ctrl+Z)',
      redo: 'Redo (Ctrl+Y)',
      copy: 'Copy (Ctrl+C)',
      paste: 'Paste (Ctrl+V)',
      cut: 'Cut (Ctrl+X)',
      fontFamily: 'Font Family',
      fontSize: 'Font Size',
      bold: 'Bold (Ctrl+B)',
      italic: 'Italic (Ctrl+I)',
      underline: 'Underline (Ctrl+U)',
      strikethrough: 'Strikethrough',
      textColor: 'Text Color',
      backgroundColor: 'Background Color',
      alignLeft: 'Align Left',
      alignCenter: 'Align Center',
      alignRight: 'Align Right',
      border: 'Border',
      noBorder: 'No Border',
      allBorders: 'All Borders',
      outerBorder: 'Outer Border',
      topBorder: 'Top Border',
      bottomBorder: 'Bottom Border',
      numberFormat: 'Number Format',
      general: 'General',
      number: 'Number',
      currency: 'Currency',
      percent: 'Percent',
      date: 'Date',
      mergeCells: 'Merge Cells',
      wrapText: 'Wrap Text',
      decreaseIndent: 'Decrease Indent',
      increaseIndent: 'Increase Indent',
      sortAsc: 'Sort Ascending',
      sortDesc: 'Sort Descending',
      filter: 'Filter',
      sum: 'Sum',
      insertFunction: 'Insert Function',
    },
    pricing: {
      title: 'Choose Your Plan',
      subtitle: 'Flexible pricing plans to meet different needs',
      free: {
        name: 'Free',
        price: '$0',
        description: 'Perfect for personal use',
        features: ['300 free pages', 'Basic AI extraction', 'Standard processing speed', 'Community support'],
        button: 'Get Started',
      },
      monthly: {
        name: 'Professional',
        price: '$9.9',
        description: 'Perfect for professionals with regular needs',
        features: ['2000 pages/month', '~$0.005/page', 'Unlimited data export', 'Priority support'],
        button: 'Subscribe Now',
        recommended: 'Recommended',
      },
      yearly: {
        name: 'Annual',
        price: '$107',
        description: 'Perfect for heavy users and enterprises',
        features: ['20400 pages/year', '~$0.005/page', 'Unlimited data export', 'Priority support', 'Save 10%'],
        button: 'Subscribe Now',
        bestValue: 'Best Value',
      },
    },
    payment: {
      completeSubscription: 'Complete Subscription',
      selectPlan: 'Choose your plan and complete payment',
      orderInfo: 'Order Information',
      total: 'Total',
      paymentMethod: 'Payment Method',
      email: 'Email',
      cardInfo: 'Card Information',
      expiryDate: 'MM/YY',
      cardholderName: 'Cardholder Name',
      payNow: 'Pay Now',
      processing: 'Processing...',
      backToPlans: 'View All Plans',
    },
    paymentSuccess: {
      title: 'Payment Successful!',
      subtitle: 'Thank you for your subscription, your account has been successfully upgraded',
      orderDetails: 'Order Details',
      orderId: 'Order ID',
      plan: 'Subscription Plan',
      amount: 'Payment Amount',
      paymentMethod: 'Payment Method',
      paymentTime: 'Payment Time',
      status: 'Status',
      completed: 'Completed',
      accountInfo: 'Account Information',
      currentPlan: 'Current Plan',
      usage: 'Usage',
      used: 'Used',
      remaining: 'Remaining',
      startUsing: 'Start Using',
      viewDashboard: 'View Dashboard',
    },
    invite: {
      title: 'Invite Friends',
      subtitle: 'Invite friends to register, both get 100 pages',
      yourCode: 'Your Invite Code',
      inviteLink: 'Invite Link',
      copy: 'Copy',
      copied: 'Copied!',
      statistics: 'Invite Statistics',
      inviteCount: 'People Invited',
      earnedPages: 'Pages Earned',
      rules: 'Invite Rules',
      rule1: 'When friends register with your invite code, both get 100 pages',
      rule2: 'Invite pages are permanent and never expire',
      rule3: 'No limit on invites, invite more to earn more',
    },
    upgrade: {
      title: 'Upgrade Plan',
      subtitle: 'Choose the plan that suits you and unlock more features',
      monthly: {
        name: 'Professional',
        description: 'Perfect for professionals with regular needs',
        price: '$9.9',
        features: ['2000 pages/month', '~$0.005/page', 'Unlimited data export', 'Priority support'],
      },
      yearly: {
        name: 'Annual',
        description: 'Perfect for long-term users',
        price: '$107',
        features: ['20400 pages/year', '~$0.0052/page', 'Unlimited data export', 'Priority support', 'Save 10%'],
      },
      redirectNote: 'You will be redirected to payment page after selecting a plan',
    },
    paymentFailed: {
      title: 'Payment Failed',
      subtitle: 'Sorry, your payment could not be processed successfully',
      errorDetails: 'Error Details',
      commonIssues: 'Common Issues and Solutions',
      cardInfoError: 'Card Information Error',
      cardInfoErrorDesc: 'Please check if card number, expiry date and CVC are correct',
      insufficientFunds: 'Insufficient Funds',
      insufficientFundsDesc: 'Please ensure your card has sufficient balance',
      bankRestriction: 'Bank Restriction',
      bankRestrictionDesc: 'Some banks may restrict online payments, please contact your bank',
      networkIssue: 'Network Issue',
      networkIssueDesc: 'Please check your network connection and try again later',
      testEnvironment: 'Test Environment Notice',
      testEnvironmentDesc: 'This is a demo environment, you can use the following test card numbers:',
      retryPayment: 'Retry Payment',
      selectOtherPlan: 'Select Other Plan',
      needHelp: 'Need Help?',
      needHelpDesc: 'If the problem persists, please contact our customer service team',
      contactSupport: 'Contact Support',
    },
    tools: {
      title: 'PDF Tools',
      subtitle: 'Powerful PDF processing tools for all your needs',
      categories: {
        aiTools: {
          name: 'AI Extraction Tools',
          description: 'Intelligent data extraction using AI technology',
          badge: 'Paid',
        },
        pdfUtils: {
          name: 'PDF Utilities',
          description: 'Common PDF processing tools',
          badge: 'Free',
        },
        convert: {
          name: 'Convert & Export',
          description: 'Format conversion tools',
          badge: 'Free',
        },
        edit: {
          name: 'Edit Tools',
          description: 'PDF editing and modification',
          badge: 'Free',
        },
      },
      toolNames: {
        aiPdfExtract: 'AI PDF Extract',
        aiImageExtract: 'AI Image Extract',
        pdfMerge: 'Merge PDF',
        pdfSplit: 'Split PDF',
        pdfCompress: 'Compress PDF',
        pdfRotate: 'Rotate PDF',
        pdfPrint: 'Print PDF',
        excelToPdf: 'Excel to PDF',
        jpgToPdf: 'JPG to PDF',
        pdfToJpg: 'PDF to JPG',
        pdfEdit: 'Edit PDF',
        pdfExtractPages: 'Extract Pages',
        pdfPageNumber: 'Add Page Numbers',
        pdfWatermark: 'Add Watermark',
        pdfDeletePages: 'Delete Pages',
      },
      descriptions: {
        aiPdfExtract: 'Intelligently extract PDF data to Excel',
        aiImageExtract: 'Extract structured data from images',
        pdfMerge: 'Merge multiple PDFs into one',
        pdfSplit: 'Split PDF into multiple files',
        pdfCompress: 'Reduce PDF file size',
        pdfRotate: 'Rotate PDF pages',
        pdfPrint: 'Print PDF documents',
        excelToPdf: 'Convert Excel to PDF',
        jpgToPdf: 'Convert images to PDF',
        pdfToJpg: 'Convert PDF to images',
        pdfEdit: 'Edit PDF content',
        pdfExtractPages: 'Extract PDF pages',
        pdfPageNumber: 'Add page numbers to PDF',
        pdfWatermark: 'Add watermark to PDF',
        pdfDeletePages: 'Delete PDF pages',
      },
      features: {
        easyToUse: 'Easy to Use',
        easyToUseDesc: 'Drag and drop files to merge, no complex operations',
        completelyFree: 'Completely Free',
        completelyFreeDesc: 'No registration required, unlimited use',
        fastDownload: 'Fast Download',
        fastDownloadDesc: 'Download immediately after merging',
        flexibleSplit: 'Flexible Split',
        flexibleSplitDesc: 'Support splitting by pages or specified ranges',
        maintainQuality: 'Maintain Quality',
        maintainQualityDesc: 'Keep original PDF quality after splitting',
        batchDownload: 'Batch Download',
        batchDownloadDesc: 'Download all split files at once',
      },
      actions: {
        selectFiles: 'Select PDF Files',
        selectFile: 'Select File',
        dragDropFiles: 'Drag and drop PDF files here',
        dragDropFile: 'Select PDF File',
        clickToSelect: 'Or click the button below to select files',
        changeFile: 'Change File',
        clearAll: 'Clear All',
        startMerge: 'Merge PDF',
        startSplit: 'Start Split',
        merging: 'Merging...',
        splitting: 'Splitting...',
        processing: 'Processing...',
        moveUp: 'Move Up',
        moveDown: 'Move Down',
        remove: 'Remove',
      },
      splitModes: {
        byPages: 'Split by Pages',
        byPagesDesc: 'Split every N pages into one file',
        byRange: 'Split by Range',
        byRangeDesc: 'Split by specified page ranges',
        pagesPerFile: 'Pages per file',
        pageRanges: 'Page ranges',
        pageRangesPlaceholder: 'e.g: 1-3, 5, 7-10',
        pageRangesHelp: 'Use commas to separate multiple ranges, e.g: 1-3, 5, 7-10',
      },
      messages: {
        selectAtLeast2Files: 'Please upload at least 2 PDF files',
        mergeSuccess: 'PDF merged successfully! Download started',
        splitSuccess: 'PDF split successfully! Download started',
        processingFailed: 'PDF processing failed, please try again later',
        invalidFileOrRange: 'PDF split failed, please check if file and page ranges are valid',
        maxFileSize: 'Support multiple files, max 50MB each',
        selectedFiles: '{count} files selected',
      },
      upgrade: {
        title: 'Need More Powerful Features?',
        subtitle: 'Upgrade to Pro to unlock AI intelligent extraction features',
        viewPricing: 'View Pricing',
      },
      pages: {
        excelToPdf: {
          title: 'Excel to PDF',
          subtitle: 'Convert Excel to PDF, completely free',
          selectFile: 'Select Excel file',
          supportedFormats: 'Supports .xlsx, .xls formats',
          selectFileBtn: 'Select file',
          changeFile: 'Change file',
          noticeTitle: 'Conversion notes',
          notice1: 'Multiple worksheets supported',
          notice2: 'Each worksheet becomes one PDF page',
          notice3: 'Large tables are auto-adjusted to fit the page',
          notice4: 'Data beyond 40 rows will be truncated',
          converting: 'Converting...',
          startConvert: 'Start conversion',
          successMsg: 'Excel to PDF success! Download has started',
          errorMsg: 'Excel to PDF failed, please check if the file is valid',
          multiSheetTitle: 'Multi-sheet support',
          multiSheetDesc: 'Convert all worksheets automatically',
          keepFormatTitle: 'Preserve format',
          keepFormatDesc: 'Retain original table format as much as possible',
          quickConvertTitle: 'Quick conversion',
          quickConvertDesc: 'Generate PDF document quickly',
        },
        pdfRotate: {
          title: 'Rotate PDF',
          subtitle: 'Rotate PDF page orientation, completely free',
          selectFile: 'Select PDF file',
          uploadDesc: 'Upload the PDF document you want to rotate',
          selectFileBtn: 'Select file',
          changeFile: 'Change file',
          rotationLabel: 'Rotation angle',
          rotate90Label: 'Clockwise 90°',
          rotate180Label: '180°',
          rotate270Label: 'Counterclockwise 90°',
          rotating: 'Rotating...',
          startRotate: 'Start rotation',
          successMsg: 'PDF rotated successfully! Download has started',
          errorMsg: 'PDF rotation failed, please check if the file is valid',
          flexibleTitle: 'Flexible rotation',
          flexibleDesc: 'Support 90°, 180°, 270° rotation',
          keepQualityTitle: 'Keep quality',
          keepQualityDesc: 'Keep original PDF quality after rotation',
          quickDownloadTitle: 'Quick download',
          quickDownloadDesc: 'Download immediately after rotation',
        },
        jpgToPdf: {
          title: 'JPG to PDF',
          subtitle: 'Convert images to PDF, completely free',
          selectFile: 'Select images',
          supportedFormats: 'Supports JPG, PNG',
          selectFileBtn: 'Select images',
          clearAll: 'Clear all',
          selectedCount: '{count} image(s) selected',
          converting: 'Converting...',
          convertToPdf: 'Convert to PDF',
          successMsg: 'Images to PDF success! Download has started',
          errorMsg: 'Conversion failed, please check files',
          uploadOneImage: 'Please upload at least one image',
          card1Title: 'Merge multiple images',
          card1Desc: 'Combine multiple images into one PDF',
          card2Title: 'Keep quality',
          card2Desc: 'Preserve original image quality',
          card3Title: 'Quick download',
          card3Desc: 'Download immediately after conversion',
        },
        pdfToJpg: {
          title: 'PDF to JPG',
          subtitle: 'Convert PDF to images, completely free',
          selectFile: 'Select PDF file',
          uploadDesc: 'Upload the PDF to convert',
          selectFileBtn: 'Select file',
          changeFile: 'Change file',
          qualityLabel: 'Image quality',
          qualityLow: 'Standard',
          qualityMedium: 'High',
          qualityHigh: 'Maximum',
          qualityLowDesc: 'Smaller file',
          qualityMediumDesc: 'Balance size and quality',
          qualityHighDesc: 'Best quality',
          converting: 'Converting...',
          startConvert: 'Start conversion',
          successMsg: 'PDF converted! {count} image(s) generated',
          errorMsg: 'PDF to JPG failed, please check file',
          card1Title: 'High quality',
          card1Desc: 'Preserve original PDF clarity',
          card2Title: 'Batch download',
          card2Desc: 'All pages packed as ZIP',
          card3Title: 'Quality options',
          card3Desc: 'Choose image quality as needed',
        },
        pdfPrint: {
          title: 'Print PDF',
          subtitle: 'Print PDF documents, completely free',
          selectFile: 'Select PDF file',
          uploadDesc: 'Upload the PDF you want to print',
          selectFileBtn: 'Select file',
          changeFile: 'Change file',
          printButton: 'Open & Print',
          printHint: 'Click the button below to open the browser print dialog and choose your printer.',
          totalPages: '{total} page(s)',
          pageRangeLabel: 'Pages to print',
          pageRangePlaceholder: 'All or range, e.g. 1-3,5,7-10',
          copiesLabel: 'Copies',
          buildingPreview: 'Building print preview…',
        },
        pdfEdit: { title: 'Edit PDF', subtitle: 'Edit PDF content, completely free', comingSoon: 'Coming soon...' },
        pdfExtractPages: {
          title: 'Extract Pages',
          subtitle: 'Extract specified PDF pages, completely free',
          selectFile: 'Select PDF file',
          uploadDesc: 'Upload PDF to extract pages from',
          selectFileBtn: 'Select file',
          changeFile: 'Change file',
          totalPages: '{total} page(s) total',
          pageRangeLabel: 'Page range',
          pageRangePlaceholder: 'e.g. 1,3,5-8,10',
          formatHelp: 'Format:',
          formatSingle: 'Single: 1,3,5',
          formatRange: 'Range: 1-5,8-10',
          formatMixed: 'Mixed: 1,3-5,8,10-12',
          extracting: 'Extracting...',
          startExtract: 'Extract pages',
          successMsg: 'Extracted {count} page(s)! Download started',
          errorMsg: 'Extract failed, check file and range',
          invalidRange: 'Please enter a valid page range',
          readError: 'Cannot read PDF file',
          card1Title: 'Flexible extract',
          card1Desc: 'Single pages or ranges',
          card2Title: 'Keep quality',
          card2Desc: 'Lossless extraction',
          card3Title: 'Fast',
          card3Desc: 'Generate new PDF quickly',
        },
        pdfPageNumber: {
          title: 'Add Page Numbers',
          subtitle: 'Add page numbers to PDF, completely free',
          selectFile: 'Select PDF file',
          uploadDesc: 'Upload PDF to add page numbers',
          selectFileBtn: 'Select file',
          changeFile: 'Change file',
          totalPages: '{total} page(s) total',
          positionLabel: 'Position',
          positionBottomCenter: 'Bottom center',
          positionBottomRight: 'Bottom right',
          positionBottomLeft: 'Bottom left',
          positionTopCenter: 'Top center',
          positionTopRight: 'Top right',
          positionTopLeft: 'Top left',
          startNumberLabel: 'Start number',
          fontSizeLabel: 'Font size',
          previewTitle: 'Preview',
          previewPosition: 'Position',
          previewStart: 'Start number',
          previewFontSize: 'Font size',
          previewRange: 'Page range',
          adding: 'Adding...',
          startAdd: 'Add page numbers',
          successMsg: 'Added numbers to {count} page(s)! Download started',
          errorMsg: 'Failed, please check file',
          readError: 'Cannot read PDF file',
          card1Title: 'Flexible position',
          card1Desc: '6 position options',
          card2Title: 'Custom start',
          card2Desc: 'Set any start number',
          card3Title: 'Font size',
          card3Desc: 'Adjust page number font size',
        },
        pdfWatermark: {
          title: 'Add Watermark',
          subtitle: 'Add text or image watermark to PDF, completely free',
          selectFile: 'Select PDF file',
          uploadDesc: 'Upload PDF to add watermark',
          selectFileBtn: 'Select file',
          changeFile: 'Change file',
          totalPages: '{total} page(s) total',
          typeLabel: 'Watermark type',
          typeText: 'Text',
          typeImage: 'Image',
          typeTextDesc: 'Add text watermark',
          typeImageDesc: 'Add image watermark',
          textLabel: 'Watermark text',
          textPlaceholder: 'Enter watermark text',
          fontSizeLabel: 'Font size',
          imageLabel: 'Watermark image',
          selectImageHint: 'Click to select image (PNG, JPG)',
          remove: 'Remove',
          opacityLabel: 'Opacity',
          rotationLabel: 'Rotation',
          adding: 'Adding...',
          startAdd: 'Add watermark',
          successMsg: 'Added watermark to {count} page(s)! Download started',
          errorMsg: 'Add watermark failed',
          enterText: 'Please enter watermark text',
          selectImage: 'Please select watermark image',
          readError: 'Cannot read PDF file',
          card1Title: 'Text watermark',
          card1Desc: 'Custom text and font size',
          card2Title: 'Image watermark',
          card2Desc: 'PNG and JPG supported',
          card3Title: 'Custom style',
          card3Desc: 'Adjust opacity and rotation',
        },
        pdfDeletePages: {
          title: 'Delete Pages',
          subtitle: 'Delete specified PDF pages, completely free',
          selectFile: 'Select PDF file',
          uploadDesc: 'Upload PDF to delete pages from',
          selectFileBtn: 'Select file',
          changeFile: 'Change file',
          totalPages: '{total} page(s) total',
          noticeTitle: 'Notice',
          noticeDesc: 'Deletion is irreversible. Confirm the page range. You cannot delete all pages.',
          pageRangeLabel: 'Pages to delete',
          pageRangePlaceholder: 'e.g. 1,3,5-8,10',
          formatHelp: 'Format:',
          formatSingle: 'Single: 1,3,5',
          formatRange: 'Range: 1-5,8-10',
          formatMixed: 'Mixed: 1,3-5,8,10-12',
          deleting: 'Deleting...',
          startDelete: 'Delete pages',
          successMsg: 'Deleted {deleted} page(s)! {remaining} remaining',
          errorMsg: 'Delete failed, check file and range',
          invalidRange: 'Please enter a valid page range',
          cannotDeleteAll: 'Cannot delete all pages',
          readError: 'Cannot read PDF file',
          card1Title: 'Precise delete',
          card1Desc: 'Single pages or ranges',
          card2Title: 'Keep quality',
          card2Desc: 'Remaining pages unchanged',
          card3Title: 'Safe',
          card3Desc: 'Cannot delete all pages',
        },
      },
    },
    errors: {
      fileRequired: 'Please select a file',
      processingFailed: 'Processing failed, please try again later',
      loginFailed: 'Login failed, please try again later',
      signupFailed: 'Sign up failed, please try again later',
      networkError: 'Network error, please check your connection',
      unauthorized: 'Unauthorized, please login again',
      notFound: 'Page not found',
      serverError: 'Server error, please try again later',
      passwordMismatch: 'New password and confirmation do not match',
    },
    settings: {
      pageTitle: 'Account Settings',
      pageSubtitle: 'Manage your account security and preferences',
      profile: 'Profile',
      security: 'Security',
      notifications: 'Notifications',
      dangerZone: 'Danger Zone',
      personalInfo: 'Personal Info',
      name: 'Name',
      namePlaceholder: 'Enter your name',
      email: 'Email',
      emailReadonly: 'Email cannot be changed',
      saveChanges: 'Save Changes',
      saving: 'Saving...',
      currentPassword: 'Current Password',
      currentPasswordPlaceholder: 'Enter current password',
      newPassword: 'New Password',
      newPasswordPlaceholder: 'Enter new password (min 6 characters)',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceholder: 'Enter new password again',
      changePassword: 'Change Password',
      changing: 'Changing...',
      emailNotifications: 'Email Notifications',
      emailNotificationsDesc: 'Receive important account-related emails',
      planExpiryReminder: 'Plan Expiry Reminder',
      planExpiryReminderDesc: 'Get reminded when your plan is about to expire',
      usageReminder: 'Usage Reminder',
      usageReminderDesc: 'Get reminded when usage reaches 80%',
      deleteAccount: 'Delete Account',
      deleteAccountDesc: 'Deleting your account will permanently remove all data including documents and subscriptions. This cannot be undone.',
      deleteAccountButton: 'Delete My Account',
      confirmDeleteTitle: 'Confirm Delete Account',
      confirmDeleteSubtitle: 'This action cannot be undone',
      confirmDeleteBody: 'Are you sure you want to delete your account? This will permanently delete all your data including:',
      confirmDeleteList1: 'All processed documents',
      confirmDeleteList2: 'Subscriptions and payment info',
      confirmDeleteList3: 'Invite records and rewards',
      confirmDeleteList4: 'Personal settings and preferences',
      confirmDeleteButton: 'Confirm Delete',
      cancel: 'Cancel',
      deleteConfirmPrompt: 'Are you sure you want to delete your account? This cannot be undone!',
      profileTab: 'Profile',
      securityTab: 'Security',
      notificationsTab: 'Notifications',
      dangerTab: 'Danger Zone',
    },
    profile: {
      pageTitle: 'Profile',
      pageSubtitle: 'Manage your account and subscription details',
      basicInfo: 'Basic Info',
      edit: 'Edit',
      namePlaceholder: 'Enter name',
      notSetName: 'Not set',
      planFree: 'Free',
      planMonthly: 'Pro',
      planYearly: 'Annual',
    },
  },
  ja: {
    common: {
      home: 'ホーム',
      about: '概要',
      pricing: '料金',
      support: 'サポート',
      login: 'ログイン',
      signup: '登録',
      logout: 'ログアウト',
      dashboard: 'ダッシュボード',
      profile: 'プロフィール',
      settings: '設定',
      tools: 'ツール',
      save: '保存',
      cancel: 'キャンセル',
      delete: '削除',
      edit: '編集',
      close: '閉じる',
      confirm: '確認',
      loading: '読み込み中',
      error: 'エラー',
      success: '成功',
      back: '戻る',
      next: '次へ',
      previous: '前へ',
      search: '検索',
      filter: 'フィルター',
      export: 'エクスポート',
      import: 'インポート',
      copy: 'コピー',
      paste: '貼り付け',
      cut: '切り取り',
      undo: '元に戻す',
      redo: 'やり直し',
      pagesUnit: 'ページ',
      adminBadge: '管理者',
      upgradePlan: 'プランアップグレード',
      adminPanel: '管理画面',
      usageLabel: '利用状況',
      remaining: '残り',
      inviteReward: '招待特典',
      invitedCount: '招待人数',
      earnedPages: '獲得',
      inviteCodeLabel: '招待コード',
      subscription: 'サブスク管理',
    },
    navbar: {
      brand: 'PDF Extract AI',
      features: '機能',
      pricing: '料金',
      support: 'サポート',
      login: 'ログイン',
      signup: '登録',
      getStarted: '始める',
      noLoginRequired: 'ログイン不要でご利用いただけます',
      aiToolsNeedPro: 'AI抽出ツールはプロ版のご契約が必要です',
      allTools: 'すべてのツール',
    },
    home: {
      title: 'AI駆動のPDFデータ抽出',
      subtitle: 'PDFドキュメントから構造化データを智能的に抽出',
      description: '先進的なAI技術を使用して、PDFドキュメントからテーブル、テキスト、データを迅速かつ正確に抽出し、編集可能なExcel形式に変換します。',
      startFree: '無料で始める',
      learnMore: '詳細を見る',
      features: {
        aiExtraction: {
          title: 'AI智能抽出',
          description: '高度な機械学習アルゴリズムによる正確な文書構造認識と抽出',
        },
        multiFormat: {
          title: 'マルチフォーマット対応',
          description: 'PDF、画像などの複数形式をサポート、Excel、CSVなどに出力',
        },
        fastProcessing: {
          title: '高速処理',
          description: 'クラウド処理により、数秒で文書解析とデータ抽出を完了',
        },
      },
    heroTitle: 'PDFからExcelへデータを抽出',
    heroSubtitle: 'AIがPDFの不要なデータを除去し、必要な内容を抽出します',
    noCreditCard: 'クレジットカード不要',
    pagesFree: '300ページ無料',
    dragDropHere: 'ファイルをここにドラッグ',
    supportedFormats: 'PDF / 画像 / JSON',
    browseFiles: 'ファイルを選択',
    tabInvoice: '請求書',
    tabPurchaseOrder: '発注書',
    tabQuotation: '見積書',
    tabMore: 'その他...',
    tableInvoiceNo: '請求書番号',
    tableDate: '日付',
    tableBillTo: '請求先',
    tableAmount: '金額',
    tableTotal: '合計',
    requirementsLabel: '要件を入力してください',
    requirementsPlaceholder: '例：請求書の金額と日付を抽出',
    startConversion: '変換開始',
    optionDateFormat: '日付はYY-MM-DD形式',
    optionAmountWithTax: '金額に税を含める',
    optionFileHint: '最後の列の後にファイルを指定',
    howItWorksTitle: 'PDF Extract AI の仕組み',
    howItWorksSubtitle: '3ステップの智能処理でドキュメント作業を簡単に',
    step1Title: '文書内容の智能認識',
    step1Desc: '大規模モデルとOCRでPDF・画像・Word等の文字・表・構造を正確に認識',
    step2Title: 'ユーザー要件の理解',
    step2Desc: 'LLMで自然言語の指示を深く理解し、抽出要件とデータ形式を正確に把握',
    step3Title: 'Excelへ抽出',
    step3Desc: '認識・理解した内容を智能的に構造化し、希望のExcelを生成してエクスポート',
    ctaTitle: 'ワークフローを効率化する準備はできましたか？',
  },
  footer: {
    aiTools: 'AI抽出ツール',
    aiPdfExtract: 'AI PDF抽出',
    aiImageExtract: 'AI画像抽出',
    pdfTools: 'PDF常用ツール',
    mergePdf: 'PDF結合',
    splitPdf: 'PDF分割',
    compressPdf: 'PDF圧縮',
    rotatePdf: 'PDF回転',
    printPdf: 'PDF印刷',
    convertExport: '変換・エクスポート',
    excelToPdf: 'Excel to PDF',
    jpgToPdf: 'JPG to PDF',
    pdfToJpg: 'PDF to JPG',
    editTools: '編集ツール',
    editPdf: 'PDF編集',
    extractPages: 'ページ抽出',
    addPageNumber: 'ページ番号追加',
    addWatermark: '透かし追加',
    deletePages: 'ページ削除',
    customerSupport: 'カスタマーサポート',
    support: 'サポート',
    aboutUs: '私たちについて',
    privacyPolicy: 'プライバシーポリシー',
    termsOfService: '利用規約',
  },
  login: {
    title: 'アカウントにログイン',
      subtitle: 'アカウントをお持ちですか？ログインして続行してください',
      email: 'メールアドレス',
      password: 'パスワード',
      loginButton: 'ログイン',
      loggingIn: 'ログイン中...',
      noAccount: 'アカウントをお持ちでないですか？',
      signupPrompt: '今すぐ登録して300ページの無料クレジットを獲得、クレジットカード不要',
      freeSignup: '無料登録',
      backToHome: '← ホームに戻る',
    },
    signup: {
      title: '登録',
      subtitle: '300ページ無料トライアル',
      name: '名前',
      email: 'メールアドレス',
      password: 'パスワード',
      inviteCode: '招待コード（オプション）',
      inviteCodePlaceholder: '招待コードを入力して追加100ページを獲得',
      inviteBonus: '招待コードで登録すると、追加100ページを獲得！',
      signupButton: '無料登録',
      signingUp: '登録中...',
      hasAccount: 'アカウントをお持ちですか？',
      loginNow: '今すぐログイン',
      backToHome: '← ホームに戻る',
      passwordMinLength: '6文字以上',
    },
    dashboard: {
      title: '会話',
      subtitle: 'AI抽出会話を管理、{used} / {limit} ページ使用済み',
      newConversation: '新しい会話',
      noConversations: 'まだ会話がありません',
      noConversationsDesc: '最初のAIデータ抽出会話を開始してください',
      startExtracting: '抽出を開始',
      conversation: '会話',
      fileCount: 'ファイル数',
      workbook: 'ワークブック',
      createTime: '作成時間',
      actions: 'アクション',
      view: '表示',
      delete: '削除',
      confirmDelete: 'この会話を削除してもよろしいですか？',
      pagination: 'ページあたり：30   {total}件中1 - {count}件を表示',
    },
    extract: {
      conversation: '会話',
      pagesUsed: '{used} / {limit} ページ使用済み',
      upgrade: 'アップグレード',
      invite: '100ページ招待',
      newSession: '新しいセッション',
      dragDropFiles: 'ファイルをここにドラッグ＆ドロップ',
      clickToUpload: 'クリックまたはドラッグしてアップロード',
      supportedFormats: 'pdf·images·json',
      parseRules: '解析ルール',
      parseRulesPlaceholder: 'Extract all line items from the invoice table ro...',
      advancedRules: '高度なルールを使用',
      useAdvancedRules: '高度なルールが設定されました',
      clearRules: 'ルールをクリア',
      startConversion: '変換を開始',
      processing: '処理中...',
      selectTemplate: 'テンプレートを選択',
      saveAsTemplate: 'テンプレートとして保存',
      export: 'エクスポート',
      editConversationName: 'ダブルクリックで会話名を編集',
      backToConversations: '会話リストに戻る',
    },
    toolbar: {
      undo: '元に戻す (Ctrl+Z)',
      redo: 'やり直し (Ctrl+Y)',
      copy: 'コピー (Ctrl+C)',
      paste: '貼り付け (Ctrl+V)',
      cut: '切り取り (Ctrl+X)',
      fontFamily: 'フォント',
      fontSize: 'フォントサイズ',
      bold: '太字 (Ctrl+B)',
      italic: '斜体 (Ctrl+I)',
      underline: '下線 (Ctrl+U)',
      strikethrough: '取り消し線',
      textColor: 'テキスト色',
      backgroundColor: '背景色',
      alignLeft: '左揃え',
      alignCenter: '中央揃え',
      alignRight: '右揃え',
      border: '境界線',
      noBorder: '境界線なし',
      allBorders: 'すべての境界線',
      outerBorder: '外側の境界線',
      topBorder: '上の境界線',
      bottomBorder: '下の境界線',
      numberFormat: '数値形式',
      general: '標準',
      number: '数値',
      currency: '通貨',
      percent: 'パーセント',
      date: '日付',
      mergeCells: 'セルの結合',
      wrapText: 'テキストの折り返し',
      decreaseIndent: 'インデントを減らす',
      increaseIndent: 'インデントを増やす',
      sortAsc: '昇順ソート',
      sortDesc: '降順ソート',
      filter: 'フィルター',
      sum: '合計',
      insertFunction: '関数の挿入',
    },
    pricing: {
      title: 'プランを選択',
      subtitle: '様々なニーズに対応する柔軟な料金プラン',
      free: {
        name: '無料版',
        price: '¥0',
        description: '個人利用に最適',
        features: ['300ページ無料', '基本AI抽出', '標準処理速度', 'コミュニティサポート'],
        button: '始める',
      },
      monthly: {
        name: 'プロフェッショナル',
        price: '$9.9',
        description: '定期的なニーズを持つプロフェッショナルに最適',
        features: ['2000ページ/月', '約$0.005/ページ', '無制限データエクスポート', '優先サポート'],
        button: '今すぐ購読',
        recommended: 'おすすめ',
      },
      yearly: {
        name: '年間版',
        price: '$107',
        description: 'ヘビーユーザーと企業に最適',
        features: ['20400ページ/年', '約$0.005/ページ', '無制限データエクスポート', '優先サポート', '10%節約'],
        button: '今すぐ購読',
        bestValue: '最もお得',
      },
    },
    payment: {
      completeSubscription: '購読を完了',
      selectPlan: 'プランを選択して支払いを完了してください',
      orderInfo: '注文情報',
      total: '合計',
      paymentMethod: '支払い方法',
      email: 'メールアドレス',
      cardInfo: 'カード情報',
      expiryDate: 'MM/YY',
      cardholderName: 'カード名義人',
      payNow: '今すぐ支払う',
      processing: '処理中...',
      backToPlans: 'すべてのプランを表示',
    },
    paymentSuccess: {
      title: '支払い成功！',
      subtitle: 'ご購読ありがとうございます。アカウントが正常にアップグレードされました',
      orderDetails: '注文詳細',
      orderId: '注文ID',
      plan: '購読プラン',
      amount: '支払い金額',
      paymentMethod: '支払い方法',
      paymentTime: '支払い時間',
      status: 'ステータス',
      completed: '完了',
      accountInfo: 'アカウント情報',
      currentPlan: '現在のプラン',
      usage: '使用状況',
      used: '使用済み',
      remaining: '残り',
      startUsing: '使用を開始',
      viewDashboard: 'ダッシュボードを表示',
    },
    invite: {
      title: '友達を招待',
      subtitle: '友達を招待して登録すると、両方が100ページを獲得',
      yourCode: 'あなたの招待コード',
      inviteLink: '招待リンク',
      copy: 'コピー',
      copied: 'コピーしました！',
      statistics: '招待統計',
      inviteCount: '招待した人数',
      earnedPages: '獲得ページ数',
      rules: '招待ルール',
      rule1: '友達があなたの招待コードで登録すると、両方が100ページを獲得',
      rule2: '招待ページは永続的で期限切れになりません',
      rule3: '招待数に制限なし、多く招待するほど多く獲得',
    },
    upgrade: {
      title: 'プランをアップグレード',
      subtitle: 'あなたに適したプランを選択して、より多くの機能をアンロック',
      monthly: {
        name: 'プロフェッショナル',
        description: '定期的なニーズを持つプロフェッショナルに最適',
        price: '$9.9',
        features: ['2000ページ/月', '約$0.005/ページ', '無制限データエクスポート', '優先サポート'],
      },
      yearly: {
        name: '年間版',
        description: '長期利用ユーザーに最適',
        price: '$107',
        features: ['20400ページ/年', '約$0.0052/ページ', '無制限データエクスポート', '優先サポート', '10%節約'],
      },
      redirectNote: 'プラン選択後、支払いページにリダイレクトされます',
    },
    paymentFailed: {
      title: '支払い失敗',
      subtitle: '申し訳ございませんが、お支払いの処理に失敗しました',
      errorDetails: 'エラー詳細',
      commonIssues: 'よくある問題と解決策',
      cardInfoError: 'カード情報エラー',
      cardInfoErrorDesc: 'カード番号、有効期限、CVCが正しいか確認してください',
      insufficientFunds: '残高不足',
      insufficientFundsDesc: 'カードに十分な残高があることを確認してください',
      bankRestriction: '銀行制限',
      bankRestrictionDesc: '一部の銀行はオンライン決済を制限している場合があります。銀行にお問い合わせください',
      networkIssue: 'ネットワーク問題',
      networkIssueDesc: 'ネットワーク接続を確認し、後でもう一度お試しください',
      testEnvironment: 'テスト環境のお知らせ',
      testEnvironmentDesc: 'これはデモ環境です。以下のテストカード番号をご利用いただけます：',
      retryPayment: '支払いを再試行',
      selectOtherPlan: '他のプランを選択',
      needHelp: 'ヘルプが必要ですか？',
      needHelpDesc: '問題が解決しない場合は、カスタマーサービスチームにお問い合わせください',
      contactSupport: 'サポートに連絡',
    },
    tools: {
      title: 'PDFツール',
      subtitle: 'あらゆるニーズに対応する強力なPDF処理ツール',
      categories: {
        aiTools: {
          name: 'AI抽出ツール',
          description: 'AI技術を使用したインテリジェントなデータ抽出',
          badge: '有料',
        },
        pdfUtils: {
          name: 'PDFユーティリティ',
          description: '一般的なPDF処理ツール',
          badge: '無料',
        },
        convert: {
          name: '変換・エクスポート',
          description: 'フォーマット変換ツール',
          badge: '無料',
        },
        edit: {
          name: '編集ツール',
          description: 'PDF編集と修正',
          badge: '無料',
        },
      },
      toolNames: {
        aiPdfExtract: 'AI PDF抽出',
        aiImageExtract: 'AI画像抽出',
        pdfMerge: 'PDF結合',
        pdfSplit: 'PDF分割',
        pdfCompress: 'PDF圧縮',
        pdfRotate: 'PDF回転',
        pdfPrint: 'PDF印刷',
        excelToPdf: 'ExcelからPDF',
        jpgToPdf: 'JPGからPDF',
        pdfToJpg: 'PDFからJPG',
        pdfEdit: 'PDF編集',
        pdfExtractPages: 'ページ抽出',
        pdfPageNumber: 'ページ番号追加',
        pdfWatermark: '透かし追加',
        pdfDeletePages: 'ページ削除',
      },
      descriptions: {
        aiPdfExtract: 'PDFデータをExcelに智能的に抽出',
        aiImageExtract: '画像から構造化データを抽出',
        pdfMerge: '複数のPDFを1つに結合',
        pdfSplit: 'PDFを複数のファイルに分割',
        pdfCompress: 'PDFファイルサイズを縮小',
        pdfRotate: 'PDFページを回転',
        pdfPrint: 'PDF文書を印刷',
        excelToPdf: 'ExcelをPDFに変換',
        jpgToPdf: '画像をPDFに変換',
        pdfToJpg: 'PDFを画像に変換',
        pdfEdit: 'PDFコンテンツを編集',
        pdfExtractPages: 'PDFページを抽出',
        pdfPageNumber: 'PDFにページ番号を追加',
        pdfWatermark: 'PDFに透かしを追加',
        pdfDeletePages: 'PDFページを削除',
      },
      features: {
        easyToUse: '使いやすい',
        easyToUseDesc: 'ファイルをドラッグ＆ドロップするだけで結合、複雑な操作不要',
        completelyFree: '完全無料',
        completelyFreeDesc: '登録不要、無制限使用',
        fastDownload: '高速ダウンロード',
        fastDownloadDesc: '結合完了後すぐにダウンロード',
        flexibleSplit: '柔軟な分割',
        flexibleSplitDesc: 'ページ数または指定範囲での分割をサポート',
        maintainQuality: '品質維持',
        maintainQualityDesc: '分割後も元のPDF品質を維持',
        batchDownload: '一括ダウンロード',
        batchDownloadDesc: '分割されたすべてのファイルを一度にダウンロード',
      },
      actions: {
        selectFiles: 'PDFファイルを選択',
        selectFile: 'ファイルを選択',
        dragDropFiles: 'PDFファイルをここにドラッグ＆ドロップ',
        dragDropFile: 'PDFファイルを選択',
        clickToSelect: 'または下のボタンをクリックしてファイルを選択',
        changeFile: 'ファイルを変更',
        clearAll: 'すべてクリア',
        startMerge: 'PDF結合',
        startSplit: '分割開始',
        merging: '結合中...',
        splitting: '分割中...',
        processing: '処理中...',
        moveUp: '上に移動',
        moveDown: '下に移動',
        remove: '削除',
      },
      splitModes: {
        byPages: 'ページ数で分割',
        byPagesDesc: 'N ページごとに1つのファイルに分割',
        byRange: '範囲で分割',
        byRangeDesc: '指定したページ範囲で分割',
        pagesPerFile: 'ファイルあたりのページ数',
        pageRanges: 'ページ範囲',
        pageRangesPlaceholder: '例: 1-3, 5, 7-10',
        pageRangesHelp: 'カンマで複数の範囲を区切ります。例: 1-3, 5, 7-10',
      },
      messages: {
        selectAtLeast2Files: '少なくとも2つのPDFファイルをアップロードしてください',
        mergeSuccess: 'PDF結合成功！ダウンロードが開始されました',
        splitSuccess: 'PDF分割成功！ダウンロードが開始されました',
        processingFailed: 'PDF処理に失敗しました。後でもう一度お試しください',
        invalidFileOrRange: 'PDF分割に失敗しました。ファイルとページ範囲が有効か確認してください',
        maxFileSize: '複数ファイル対応、各ファイル最大50MB',
        selectedFiles: '{count}個のファイルが選択されました',
      },
      upgrade: {
        title: 'より強力な機能が必要ですか？',
        subtitle: 'プロ版にアップグレードしてAI智能抽出機能をアンロック',
        viewPricing: '料金を見る',
      },
      pages: {
        excelToPdf: {
          title: 'ExcelからPDF',
          subtitle: 'ExcelをPDFに変換、完全無料',
          selectFile: 'Excelファイルを選択',
          supportedFormats: '.xlsx、.xls形式に対応',
          selectFileBtn: 'ファイルを選択',
          changeFile: 'ファイルを変更',
          noticeTitle: '変換について',
          notice1: '複数ワークシートに対応',
          notice2: '各ワークシートは1ページのPDFになります',
          notice3: '大きな表はページに合わせて自動調整',
          notice4: '40行を超えるデータは省略されます',
          converting: '変換中...',
          startConvert: '変換開始',
          successMsg: 'ExcelからPDFへの変換に成功しました。ダウンロードを開始しました',
          errorMsg: '変換に失敗しました。ファイルが有効か確認してください',
          multiSheetTitle: '複数ワークシート対応',
          multiSheetDesc: 'すべてのワークシートを自動変換',
          keepFormatTitle: '書式を保持',
          keepFormatDesc: '元の表の書式をできるだけ保持',
          quickConvertTitle: '高速変換',
          quickConvertDesc: 'すばやくPDFを生成',
        },
        pdfRotate: {
          title: 'PDF回転',
          subtitle: 'PDFページの向きを回転、完全無料',
          selectFile: 'PDFファイルを選択',
          uploadDesc: '回転したいPDFドキュメントをアップロード',
          selectFileBtn: 'ファイルを選択',
          changeFile: 'ファイルを変更',
          rotationLabel: '回転角度',
          rotate90Label: '時計回り90°',
          rotate180Label: '180°',
          rotate270Label: '反時計回り90°',
          rotating: '回転中...',
          startRotate: '回転開始',
          successMsg: 'PDFの回転に成功しました。ダウンロードを開始しました',
          errorMsg: 'PDFの回転に失敗しました。ファイルが有効か確認してください',
          flexibleTitle: '柔軟な回転',
          flexibleDesc: '90°、180°、270°の回転に対応',
          keepQualityTitle: '品質を保持',
          keepQualityDesc: '回転後も元のPDF品質を維持',
          quickDownloadTitle: '高速ダウンロード',
          quickDownloadDesc: '回転完了後すぐにダウンロード',
        },
        jpgToPdf: {
          title: 'JPGをPDFに',
          subtitle: '画像をPDFに変換、完全無料',
          selectFile: '画像を選択',
          supportedFormats: 'JPG、PNG対応',
          selectFileBtn: '画像を選択',
          clearAll: 'すべてクリア',
          selectedCount: '{count}枚の画像を選択',
          converting: '変換中...',
          convertToPdf: 'PDFに変換',
          successMsg: '画像からPDFへの変換に成功しました',
          errorMsg: '変換に失敗しました',
          uploadOneImage: '少なくとも1枚の画像をアップロードしてください',
          card1Title: '複数画像結合',
          card1Desc: '複数画像を1つのPDFに',
          card2Title: '品質維持',
          card2Desc: '元の画像品質を保持',
          card3Title: '高速ダウンロード',
          card3Desc: '変換後すぐにダウンロード',
        },
        pdfToJpg: {
          title: 'PDFをJPGに',
          subtitle: 'PDFを画像に変換、完全無料',
          selectFile: 'PDFファイルを選択',
          uploadDesc: '変換するPDFをアップロード',
          selectFileBtn: 'ファイルを選択',
          changeFile: 'ファイルを変更',
          qualityLabel: '画質',
          qualityLow: '標準',
          qualityMedium: '高画質',
          qualityHigh: '最高画質',
          qualityLowDesc: '小さめファイル',
          qualityMediumDesc: 'サイズと画質のバランス',
          qualityHighDesc: '最高の仕上がり',
          converting: '変換中...',
          startConvert: '変換開始',
          successMsg: 'PDF変換成功！{count}枚の画像を生成',
          errorMsg: '変換に失敗しました',
          card1Title: '高画質変換',
          card1Desc: '元のPDFの鮮明さを保持',
          card2Title: '一括ダウンロード',
          card2Desc: '全ページをZIPでダウンロード',
          card3Title: '画質選択',
          card3Desc: '用途に合わせて画質を選択',
        },
        pdfPrint: {
          title: 'PDF印刷',
          subtitle: 'PDF文書を印刷、完全無料',
          selectFile: 'PDFファイルを選択',
          uploadDesc: '印刷するPDFをアップロード',
          selectFileBtn: 'ファイルを選択',
          changeFile: 'ファイルを変更',
          printButton: '開いて印刷',
          printHint: '下のボタンでブラウザの印刷ダイアログを開き、プリンターを選択して印刷できます。',
          totalPages: '全{total}ページ',
          pageRangeLabel: '印刷するページ',
          pageRangePlaceholder: 'すべてまたは範囲（例：1-3,5,7-10）',
          copiesLabel: '部数',
          buildingPreview: '印刷プレビューを生成中…',
        },
        pdfEdit: { title: 'PDF編集', subtitle: 'PDF内容を編集、完全無料', comingSoon: '準備中です...' },
        pdfExtractPages: {
          title: 'ページ抽出',
          subtitle: 'PDFの指定ページを抽出、完全無料',
          selectFile: 'PDFファイルを選択',
          uploadDesc: 'ページを抽出するPDFをアップロード',
          selectFileBtn: 'ファイルを選択',
          changeFile: 'ファイルを変更',
          totalPages: '合計{total}ページ',
          pageRangeLabel: 'ページ範囲',
          pageRangePlaceholder: '例: 1,3,5-8,10',
          formatHelp: '形式：',
          formatSingle: '単一: 1,3,5',
          formatRange: '範囲: 1-5,8-10',
          formatMixed: '混合: 1,3-5,8,10-12',
          extracting: '抽出中...',
          startExtract: 'ページを抽出',
          successMsg: '{count}ページを抽出しました！ダウンロード開始',
          errorMsg: '抽出に失敗しました',
          invalidRange: '有効なページ範囲を入力してください',
          readError: 'PDFを読み込めません',
          card1Title: '柔軟な抽出',
          card1Desc: '単一ページ・範囲に対応',
          card2Title: '品質維持',
          card2Desc: '劣化なしで抽出',
          card3Title: '高速処理',
          card3Desc: 'すばやく新しいPDFを生成',
        },
        pdfPageNumber: {
          title: 'ページ番号追加',
          subtitle: 'PDFにページ番号を追加、完全無料',
          selectFile: 'PDFファイルを選択',
          uploadDesc: 'ページ番号を追加するPDFをアップロード',
          selectFileBtn: 'ファイルを選択',
          changeFile: 'ファイルを変更',
          totalPages: '合計{total}ページ',
          positionLabel: '位置',
          positionBottomCenter: '下中央',
          positionBottomRight: '下右',
          positionBottomLeft: '下左',
          positionTopCenter: '上中央',
          positionTopRight: '上右',
          positionTopLeft: '上左',
          startNumberLabel: '開始番号',
          fontSizeLabel: 'フォントサイズ',
          previewTitle: 'プレビュー',
          previewPosition: '位置',
          previewStart: '開始番号',
          previewFontSize: 'フォントサイズ',
          previewRange: 'ページ範囲',
          adding: '追加中...',
          startAdd: 'ページ番号を追加',
          successMsg: '{count}ページに番号を追加しました！',
          errorMsg: '追加に失敗しました',
          readError: 'PDFを読み込めません',
          card1Title: '位置選択',
          card1Desc: '6種類の位置から選択',
          card2Title: '開始番号',
          card2Desc: '任意の開始番号を設定',
          card3Title: 'フォントサイズ',
          card3Desc: 'ページ番号のサイズを調整',
        },
        pdfWatermark: {
          title: '透かし追加',
          subtitle: 'PDFに文字または画像の透かしを追加、完全無料',
          selectFile: 'PDFファイルを選択',
          uploadDesc: '透かしを追加するPDFをアップロード',
          selectFileBtn: 'ファイルを選択',
          changeFile: 'ファイルを変更',
          totalPages: '合計{total}ページ',
          typeLabel: '透かしタイプ',
          typeText: '文字',
          typeImage: '画像',
          typeTextDesc: '文字の透かし',
          typeImageDesc: '画像の透かし',
          textLabel: '透かし文字',
          textPlaceholder: '透かし文字を入力',
          fontSizeLabel: 'フォントサイズ',
          imageLabel: '透かし画像',
          selectImageHint: 'クリックして画像を選択 (PNG, JPG)',
          remove: '削除',
          opacityLabel: '不透明度',
          rotationLabel: '回転',
          adding: '追加中...',
          startAdd: '透かしを追加',
          successMsg: '{count}ページに透かしを追加しました！',
          errorMsg: '透かしの追加に失敗しました',
          enterText: '透かし文字を入力してください',
          selectImage: '透かし画像を選択してください',
          readError: 'PDFを読み込めません',
          card1Title: '文字透かし',
          card1Desc: '文字とフォントサイズをカスタム',
          card2Title: '画像透かし',
          card2Desc: 'PNG・JPG対応',
          card3Title: 'スタイル',
          card3Desc: '不透明度と回転を調整',
        },
        pdfDeletePages: {
          title: 'ページ削除',
          subtitle: 'PDFの指定ページを削除、完全無料',
          selectFile: 'PDFファイルを選択',
          uploadDesc: 'ページを削除するPDFをアップロード',
          selectFileBtn: 'ファイルを選択',
          changeFile: 'ファイルを変更',
          totalPages: '合計{total}ページ',
          noticeTitle: '注意',
          noticeDesc: '削除は取り消せません。削除する範囲を確認してください。全ページは削除できません。',
          pageRangeLabel: '削除するページ範囲',
          pageRangePlaceholder: '例: 1,3,5-8,10',
          formatHelp: '形式：',
          formatSingle: '単一: 1,3,5',
          formatRange: '範囲: 1-5,8-10',
          formatMixed: '混合: 1,3-5,8,10-12',
          deleting: '削除中...',
          startDelete: 'ページを削除',
          successMsg: '{deleted}ページを削除しました！残り{remaining}ページ',
          errorMsg: '削除に失敗しました',
          invalidRange: '有効なページ範囲を入力してください',
          cannotDeleteAll: '全ページは削除できません',
          readError: 'PDFを読み込めません',
          card1Title: '正確に削除',
          card1Desc: '単一・範囲で削除',
          card2Title: '品質維持',
          card2Desc: '残りページはそのまま',
          card3Title: '安全',
          card3Desc: '全ページ削除を防止',
        },
      },
    },
    errors: {
      fileRequired: 'ファイルを選択してください',
      processingFailed: '処理に失敗しました。後でもう一度お試しください',
      loginFailed: 'ログインに失敗しました。後でもう一度お試しください',
      signupFailed: '登録に失敗しました。後でもう一度お試しください',
      networkError: 'ネットワークエラー。接続を確認してください',
      unauthorized: '認証されていません。再度ログインしてください',
      notFound: 'ページが見つかりません',
      serverError: 'サーバーエラー。後でもう一度お試しください',
      passwordMismatch: '新しいパスワードと確認が一致しません',
    },
    settings: {
      pageTitle: 'アカウント設定',
      pageSubtitle: 'セキュリティと設定を管理',
      profile: 'プロフィール',
      security: 'セキュリティ',
      notifications: '通知',
      dangerZone: '危険な操作',
      personalInfo: '個人情報',
      name: '名前',
      namePlaceholder: '名前を入力',
      email: 'メール',
      emailReadonly: 'メールは変更できません',
      saveChanges: '保存',
      saving: '保存中...',
      currentPassword: '現在のパスワード',
      currentPasswordPlaceholder: '現在のパスワードを入力',
      newPassword: '新しいパスワード',
      newPasswordPlaceholder: '新しいパスワード（6文字以上）',
      confirmPassword: 'パスワード確認',
      confirmPasswordPlaceholder: 'もう一度入力',
      changePassword: 'パスワード変更',
      changing: '変更中...',
      emailNotifications: 'メール通知',
      emailNotificationsDesc: 'アカウント関連の重要なお知らせを受け取る',
      planExpiryReminder: 'プラン期限リマインダー',
      planExpiryReminderDesc: 'プラン期限前にリマインド',
      usageReminder: '使用量リマインダー',
      usageReminderDesc: '使用量が80%に達したらリマインド',
      deleteAccount: 'アカウント削除',
      deleteAccountDesc: 'アカウントを削除するとドキュメントやサブスクリプションを含むすべてのデータが永久に削除されます。元に戻せません。',
      deleteAccountButton: 'アカウントを削除',
      confirmDeleteTitle: 'アカウント削除の確認',
      confirmDeleteSubtitle: 'この操作は元に戻せません',
      confirmDeleteBody: 'アカウントを削除しますか？以下のデータが永久に削除されます：',
      confirmDeleteList1: '処理したドキュメント',
      confirmDeleteList2: 'サブスクリプションと支払い情報',
      confirmDeleteList3: '招待記録と特典',
      confirmDeleteList4: '個人設定',
      confirmDeleteButton: '削除する',
      cancel: 'キャンセル',
      deleteConfirmPrompt: 'アカウントを削除してもよろしいですか？元に戻せません。',
      profileTab: 'プロフィール',
      securityTab: 'セキュリティ',
      notificationsTab: '通知',
      dangerTab: '危険な操作',
    },
    profile: {
      pageTitle: 'プロフィール',
      pageSubtitle: 'アカウントとサブスクリプションの管理',
      basicInfo: '基本情報',
      edit: '編集',
      namePlaceholder: '名前を入力',
      notSetName: '未設定',
      planFree: '無料',
      planMonthly: 'プロ',
      planYearly: '年間',
    },
  },
  ko: {
    common: {
      home: '홈',
      about: '소개',
      pricing: '요금제',
      support: '지원',
      login: '로그인',
      signup: '회원가입',
      logout: '로그아웃',
      dashboard: '대시보드',
      profile: '프로필',
      settings: '설정',
      tools: '도구',
      save: '저장',
      cancel: '취소',
      delete: '삭제',
      edit: '편집',
      close: '닫기',
      confirm: '확인',
      loading: '로딩 중',
      error: '오류',
      success: '성공',
      back: '뒤로',
      next: '다음',
      previous: '이전',
      search: '검색',
      filter: '필터',
      export: '내보내기',
      import: '가져오기',
      copy: '복사',
      paste: '붙여넣기',
      cut: '잘라내기',
      undo: '실행 취소',
      redo: '다시 실행',
      pagesUnit: '페이지',
      adminBadge: '관리자',
      upgradePlan: '플랜 업그레이드',
      adminPanel: '관리 패널',
      usageLabel: '사용 현황',
      remaining: '남은',
      inviteReward: '초대 보상',
      invitedCount: '초대한 사람',
      earnedPages: '획득',
      inviteCodeLabel: '초대 코드',
      subscription: '구독 관리',
    },
    navbar: {
      brand: 'PDF Extract AI',
      features: '기능',
      pricing: '요금제',
      support: '지원',
      login: '로그인',
      signup: '회원가입',
      getStarted: '시작하기',
      noLoginRequired: '로그인 없이 사용 가능',
      aiToolsNeedPro: 'AI 추출 도구는 프로 구독이 필요합니다',
      allTools: '모든 도구',
    },
    home: {
      title: 'AI 기반 PDF 데이터 추출',
      subtitle: 'PDF 문서에서 구조화된 데이터를 지능적으로 추출',
      description: '고급 AI 기술을 사용하여 PDF 문서에서 테이블, 텍스트, 데이터를 빠르고 정확하게 추출하여 편집 가능한 Excel 형식으로 변환합니다.',
      startFree: '무료로 시작',
      learnMore: '자세히 보기',
      features: {
        aiExtraction: {
          title: 'AI 스마트 추출',
          description: '정확한 문서 구조 인식 및 추출을 위한 고급 머신러닝 알고리즘',
        },
        multiFormat: {
          title: '다중 형식 지원',
          description: 'PDF, 이미지 등 다양한 형식 지원, Excel, CSV 등으로 출력',
        },
        fastProcessing: {
          title: '빠른 처리',
          description: '클라우드 처리로 몇 초 만에 문서 파싱 및 데이터 추출 완료',
        },
      },
      heroTitle: 'PDF에서 Excel로 데이터 추출',
      heroSubtitle: 'AI가 PDF의 불필요한 데이터를 제거하고 필요한 내용을 추출합니다',
      noCreditCard: '신용카드 불필요',
      pagesFree: '300페이지 무료',
      dragDropHere: '파일을 여기에 드래그하세요',
      supportedFormats: 'PDF / 이미지 / JSON',
      browseFiles: '파일 찾아보기',
      tabInvoice: '송장',
      tabPurchaseOrder: '구매주문서',
      tabQuotation: '견적서',
      tabMore: '더보기...',
      tableInvoiceNo: '송장 번호',
      tableDate: '날짜',
      tableBillTo: '청구 대상',
      tableAmount: '금액',
      tableTotal: '합계',
      requirementsLabel: '요구 사항을 알려주세요',
      requirementsPlaceholder: '예: 송장의 금액과 날짜 추출',
      startConversion: '변환 시작',
      optionDateFormat: '날짜는 YY-MM-DD 형식',
      optionAmountWithTax: '금액에 세금 포함',
      optionFileHint: '마지막 열 뒤에 파일을 지정',
      howItWorksTitle: 'PDF Extract AI 작동 방식',
      howItWorksSubtitle: '3단계 지능형 처리로 문서 작업을 간단하고 효율적으로',
      step1Title: '문서 내용 지능 인식',
      step1Desc: '대형 모델과 OCR로 PDF·이미지·Word 등에서 텍스트·표·구조를 정확히 인식',
      step2Title: '사용자 요구 이해',
      step2Desc: 'LLM으로 자연어 지시를 깊이 이해하고 추출 요구 및 데이터 형식 파악',
      step3Title: 'Excel로 추출',
      step3Desc: '인식·이해한 내용을 지능적으로 구조화하여 원하는 Excel 생성 및 내보내기',
      ctaTitle: '워크플로를 간소화할 준비가 되셨나요?',
    },
    footer: {
    aiTools: 'AI 추출 도구',
    aiPdfExtract: 'AI PDF 추출',
    aiImageExtract: 'AI 이미지 추출',
    pdfTools: 'PDF 일반 도구',
    mergePdf: 'PDF 병합',
    splitPdf: 'PDF 분할',
    compressPdf: 'PDF 압축',
    rotatePdf: 'PDF 회전',
    printPdf: 'PDF 인쇄',
    convertExport: '변환 및 내보내기',
    excelToPdf: 'Excel to PDF',
    jpgToPdf: 'JPG to PDF',
    pdfToJpg: 'PDF to JPG',
    editTools: '편집 도구',
    editPdf: 'PDF 편집',
    extractPages: '페이지 추출',
    addPageNumber: '페이지 번호 추가',
    addWatermark: '워터마크 추가',
    deletePages: '페이지 삭제',
    customerSupport: '고객 지원',
    support: '지원',
    aboutUs: '회사 소개',
    privacyPolicy: '개인정보처리방침',
    termsOfService: '서비스 약관',
  },
  login: {
    title: '계정에 로그인',
      subtitle: '이미 계정이 있으신가요? 로그인하여 계속하세요',
      email: '이메일',
      password: '비밀번호',
      loginButton: '로그인',
      loggingIn: '로그인 중...',
      noAccount: '계정이 없으신가요?',
      signupPrompt: '지금 가입하여 300페이지 무료 크레딧을 받으세요. 신용카드 불필요',
      freeSignup: '무료 가입',
      backToHome: '← 홈으로 돌아가기',
    },
    signup: {
      title: '회원가입',
      subtitle: '300페이지 무료 체험',
      name: '이름',
      email: '이메일',
      password: '비밀번호',
      inviteCode: '초대 코드 (선택사항)',
      inviteCodePlaceholder: '초대 코드를 입력하여 추가 100페이지 받기',
      inviteBonus: '초대 코드로 가입하면 추가 100페이지를 받으세요!',
      signupButton: '무료 가입',
      signingUp: '가입 중...',
      hasAccount: '이미 계정이 있으신가요?',
      loginNow: '지금 로그인',
      backToHome: '← 홈으로 돌아가기',
      passwordMinLength: '최소 6자',
    },
    dashboard: {
      title: '대화',
      subtitle: 'AI 추출 대화를 관리하세요. {used} / {limit} 페이지 사용됨',
      newConversation: '새 대화',
      noConversations: '아직 대화가 없습니다',
      noConversationsDesc: '첫 번째 AI 데이터 추출 대화를 시작하세요',
      startExtracting: '추출 시작',
      conversation: '대화',
      fileCount: '파일 수',
      workbook: '워크북',
      createTime: '생성 시간',
      actions: '작업',
      view: '보기',
      delete: '삭제',
      confirmDelete: '이 대화를 삭제하시겠습니까?',
      pagination: '페이지당: 30   {total}개 중 1 - {count}개 표시',
    },
    extract: {
      conversation: '대화',
      pagesUsed: '{used} / {limit} 페이지 사용됨',
      upgrade: '업그레이드',
      invite: '100페이지 초대',
      newSession: '새 세션',
      dragDropFiles: '여기에 파일을 드래그 앤 드롭',
      clickToUpload: '클릭하거나 드래그하여 업로드',
      supportedFormats: 'pdf·images·json',
      parseRules: '파싱 규칙',
      parseRulesPlaceholder: 'Extract all line items from the invoice table ro...',
      advancedRules: '고급 규칙 사용',
      useAdvancedRules: '고급 규칙 설정됨',
      clearRules: '규칙 지우기',
      startConversion: '변환 시작',
      processing: '처리 중...',
      selectTemplate: '템플릿 선택',
      saveAsTemplate: '템플릿으로 저장',
      export: '내보내기',
      editConversationName: '더블클릭하여 대화 이름 편집',
      backToConversations: '대화 목록으로 돌아가기',
    },
    toolbar: {
      undo: '실행 취소 (Ctrl+Z)',
      redo: '다시 실행 (Ctrl+Y)',
      copy: '복사 (Ctrl+C)',
      paste: '붙여넣기 (Ctrl+V)',
      cut: '잘라내기 (Ctrl+X)',
      fontFamily: '글꼴',
      fontSize: '글꼴 크기',
      bold: '굵게 (Ctrl+B)',
      italic: '기울임 (Ctrl+I)',
      underline: '밑줄 (Ctrl+U)',
      strikethrough: '취소선',
      textColor: '텍스트 색상',
      backgroundColor: '배경 색상',
      alignLeft: '왼쪽 정렬',
      alignCenter: '가운데 정렬',
      alignRight: '오른쪽 정렬',
      border: '테두리',
      noBorder: '테두리 없음',
      allBorders: '모든 테두리',
      outerBorder: '바깥 테두리',
      topBorder: '위쪽 테두리',
      bottomBorder: '아래쪽 테두리',
      numberFormat: '숫자 형식',
      general: '일반',
      number: '숫자',
      currency: '통화',
      percent: '백분율',
      date: '날짜',
      mergeCells: '셀 병합',
      wrapText: '텍스트 줄바꿈',
      decreaseIndent: '들여쓰기 줄이기',
      increaseIndent: '들여쓰기 늘리기',
      sortAsc: '오름차순 정렬',
      sortDesc: '내림차순 정렬',
      filter: '필터',
      sum: '합계',
      insertFunction: '함수 삽입',
    },
    pricing: {
      title: '요금제 선택',
      subtitle: '다양한 요구사항에 맞는 유연한 요금제',
      free: {
        name: '무료',
        price: '₩0',
        description: '개인 사용에 적합',
        features: ['300페이지 무료', '기본 AI 추출', '표준 처리 속도', '커뮤니티 지원'],
        button: '시작하기',
      },
      monthly: {
        name: '프로페셔널',
        price: '$9.9',
        description: '정기적인 요구사항이 있는 전문가에게 적합',
        features: ['2000페이지/월', '약 $0.005/페이지', '무제한 데이터 내보내기', '우선 지원'],
        button: '지금 구독',
        recommended: '추천',
      },
      yearly: {
        name: '연간',
        price: '$107',
        description: '헤비 유저와 기업에게 적합',
        features: ['20400페이지/년', '약 $0.005/페이지', '무제한 데이터 내보내기', '우선 지원', '10% 절약'],
        button: '지금 구독',
        bestValue: '최고 가치',
      },
    },
    payment: {
      completeSubscription: '구독 완료',
      selectPlan: '요금제를 선택하고 결제를 완료하세요',
      orderInfo: '주문 정보',
      total: '총계',
      paymentMethod: '결제 방법',
      email: '이메일',
      cardInfo: '카드 정보',
      expiryDate: 'MM/YY',
      cardholderName: '카드 소유자 이름',
      payNow: '지금 결제',
      processing: '처리 중...',
      backToPlans: '모든 요금제 보기',
    },
    paymentSuccess: {
      title: '결제 성공!',
      subtitle: '구독해 주셔서 감사합니다. 계정이 성공적으로 업그레이드되었습니다',
      orderDetails: '주문 세부사항',
      orderId: '주문 ID',
      plan: '구독 요금제',
      amount: '결제 금액',
      paymentMethod: '결제 방법',
      paymentTime: '결제 시간',
      status: '상태',
      completed: '완료됨',
      accountInfo: '계정 정보',
      currentPlan: '현재 요금제',
      usage: '사용량',
      used: '사용됨',
      remaining: '남음',
      startUsing: '사용 시작',
      viewDashboard: '대시보드 보기',
    },
    invite: {
      title: '친구 초대',
      subtitle: '친구를 초대하여 가입하면 둘 다 100페이지를 받습니다',
      yourCode: '당신의 초대 코드',
      inviteLink: '초대 링크',
      copy: '복사',
      copied: '복사됨!',
      statistics: '초대 통계',
      inviteCount: '초대한 사람 수',
      earnedPages: '획득한 페이지',
      rules: '초대 규칙',
      rule1: '친구가 당신의 초대 코드로 가입하면 둘 다 100페이지를 받습니다',
      rule2: '초대 페이지는 영구적이며 만료되지 않습니다',
      rule3: '초대 수에 제한이 없으며, 더 많이 초대할수록 더 많이 받습니다',
    },
    upgrade: {
      title: '요금제 업그레이드',
      subtitle: '당신에게 맞는 요금제를 선택하고 더 많은 기능을 잠금 해제하세요',
      monthly: {
        name: '프로페셔널',
        description: '정기적인 요구사항이 있는 전문가에게 적합',
        price: '$9.9',
        features: ['2000페이지/월', '약 $0.005/페이지', '무제한 데이터 내보내기', '우선 지원'],
      },
      yearly: {
        name: '연간',
        description: '장기 사용자에게 적합',
        price: '$107',
        features: ['20400페이지/년', '약 $0.0052/페이지', '무제한 데이터 내보내기', '우선 지원', '10% 절약'],
      },
      redirectNote: '요금제 선택 후 결제 페이지로 리디렉션됩니다',
    },
    paymentFailed: {
      title: '결제 실패',
      subtitle: '죄송합니다. 결제 처리에 실패했습니다',
      errorDetails: '오류 세부사항',
      commonIssues: '일반적인 문제 및 해결책',
      cardInfoError: '카드 정보 오류',
      cardInfoErrorDesc: '카드 번호, 유효기간, CVC가 올바른지 확인해주세요',
      insufficientFunds: '잔액 부족',
      insufficientFundsDesc: '카드에 충분한 잔액이 있는지 확인해주세요',
      bankRestriction: '은행 제한',
      bankRestrictionDesc: '일부 은행에서 온라인 결제를 제한할 수 있습니다. 은행에 문의해주세요',
      networkIssue: '네트워크 문제',
      networkIssueDesc: '네트워크 연결을 확인하고 나중에 다시 시도해주세요',
      testEnvironment: '테스트 환경 안내',
      testEnvironmentDesc: '현재 데모 환경입니다. 다음 테스트 카드 번호를 사용할 수 있습니다:',
      retryPayment: '결제 재시도',
      selectOtherPlan: '다른 요금제 선택',
      needHelp: '도움이 필요하신가요?',
      needHelpDesc: '문제가 지속되면 고객 서비스 팀에 문의해주세요',
      contactSupport: '지원팀 연락',
    },
    tools: {
      title: 'PDF 도구',
      subtitle: '모든 요구사항을 충족하는 강력한 PDF 처리 도구',
      categories: {
        aiTools: {
          name: 'AI 추출 도구',
          description: 'AI 기술을 사용한 지능적 데이터 추출',
          badge: '유료',
        },
        pdfUtils: {
          name: 'PDF 유틸리티',
          description: '일반적인 PDF 처리 도구',
          badge: '무료',
        },
        convert: {
          name: '변환 및 내보내기',
          description: '형식 변환 도구',
          badge: '무료',
        },
        edit: {
          name: '편집 도구',
          description: 'PDF 편집 및 수정',
          badge: '무료',
        },
      },
      toolNames: {
        aiPdfExtract: 'AI PDF 추출',
        aiImageExtract: 'AI 이미지 추출',
        pdfMerge: 'PDF 병합',
        pdfSplit: 'PDF 분할',
        pdfCompress: 'PDF 압축',
        pdfRotate: 'PDF 회전',
        pdfPrint: 'PDF 인쇄',
        excelToPdf: 'Excel을 PDF로',
        jpgToPdf: 'JPG를 PDF로',
        pdfToJpg: 'PDF를 JPG로',
        pdfEdit: 'PDF 편집',
        pdfExtractPages: '페이지 추출',
        pdfPageNumber: '페이지 번호 추가',
        pdfWatermark: '워터마크 추가',
        pdfDeletePages: '페이지 삭제',
      },
      descriptions: {
        aiPdfExtract: 'PDF 데이터를 Excel로 지능적으로 추출',
        aiImageExtract: '이미지에서 구조화된 데이터 추출',
        pdfMerge: '여러 PDF를 하나로 병합',
        pdfSplit: 'PDF를 여러 파일로 분할',
        pdfCompress: 'PDF 파일 크기 줄이기',
        pdfRotate: 'PDF 페이지 회전',
        pdfPrint: 'PDF 문서 인쇄',
        excelToPdf: 'Excel을 PDF로 변환',
        jpgToPdf: '이미지를 PDF로 변환',
        pdfToJpg: 'PDF를 이미지로 변환',
        pdfEdit: 'PDF 내용 편집',
        pdfExtractPages: 'PDF 페이지 추출',
        pdfPageNumber: 'PDF에 페이지 번호 추가',
        pdfWatermark: 'PDF에 워터마크 추가',
        pdfDeletePages: 'PDF 페이지 삭제',
      },
      features: {
        easyToUse: '사용하기 쉬움',
        easyToUseDesc: '파일을 드래그 앤 드롭하여 병합, 복잡한 작업 불필요',
        completelyFree: '완전 무료',
        completelyFreeDesc: '등록 불필요, 무제한 사용',
        fastDownload: '빠른 다운로드',
        fastDownloadDesc: '병합 완료 후 즉시 다운로드',
        flexibleSplit: '유연한 분할',
        flexibleSplitDesc: '페이지 수 또는 지정된 범위로 분할 지원',
        maintainQuality: '품질 유지',
        maintainQualityDesc: '분할 후에도 원본 PDF 품질 유지',
        batchDownload: '일괄 다운로드',
        batchDownloadDesc: '분할된 모든 파일을 한 번에 다운로드',
      },
      actions: {
        selectFiles: 'PDF 파일 선택',
        selectFile: '파일 선택',
        dragDropFiles: 'PDF 파일을 여기에 드래그 앤 드롭',
        dragDropFile: 'PDF 파일 선택',
        clickToSelect: '또는 아래 버튼을 클릭하여 파일 선택',
        changeFile: '파일 변경',
        clearAll: '모두 지우기',
        startMerge: 'PDF 병합',
        startSplit: '분할 시작',
        merging: '병합 중...',
        splitting: '분할 중...',
        processing: '처리 중...',
        moveUp: '위로 이동',
        moveDown: '아래로 이동',
        remove: '제거',
      },
      splitModes: {
        byPages: '페이지 수로 분할',
        byPagesDesc: 'N 페이지마다 하나의 파일로 분할',
        byRange: '범위로 분할',
        byRangeDesc: '지정된 페이지 범위로 분할',
        pagesPerFile: '파일당 페이지 수',
        pageRanges: '페이지 범위',
        pageRangesPlaceholder: '예: 1-3, 5, 7-10',
        pageRangesHelp: '쉼표로 여러 범위를 구분합니다. 예: 1-3, 5, 7-10',
      },
      messages: {
        selectAtLeast2Files: '최소 2개의 PDF 파일을 업로드해주세요',
        mergeSuccess: 'PDF 병합 성공! 다운로드가 시작되었습니다',
        splitSuccess: 'PDF 분할 성공! 다운로드가 시작되었습니다',
        processingFailed: 'PDF 처리에 실패했습니다. 나중에 다시 시도해주세요',
        invalidFileOrRange: 'PDF 분할에 실패했습니다. 파일과 페이지 범위가 유효한지 확인해주세요',
        maxFileSize: '여러 파일 지원, 각 파일 최대 50MB',
        selectedFiles: '{count}개 파일 선택됨',
      },
      upgrade: {
        title: '더 강력한 기능이 필요하신가요?',
        subtitle: '프로 버전으로 업그레이드하여 AI 지능 추출 기능을 잠금 해제하세요',
        viewPricing: '요금제 보기',
      },
      pages: {
        excelToPdf: {
          title: 'Excel을 PDF로',
          subtitle: 'Excel을 PDF로 변환, 완전 무료',
          selectFile: 'Excel 파일 선택',
          supportedFormats: '.xlsx, .xls 형식 지원',
          selectFileBtn: '파일 선택',
          changeFile: '파일 변경',
          noticeTitle: '변환 안내',
          notice1: '여러 워크시트 지원',
          notice2: '각 워크시트는 PDF 한 페이지로 변환됩니다',
          notice3: '큰 표는 페이지에 맞게 자동 조정됩니다',
          notice4: '40행을 초과하는 데이터는 잘립니다',
          converting: '변환 중...',
          startConvert: '변환 시작',
          successMsg: 'Excel을 PDF로 변환했습니다. 다운로드가 시작되었습니다',
          errorMsg: '변환에 실패했습니다. 파일이 유효한지 확인해 주세요',
          multiSheetTitle: '다중 워크시트 지원',
          multiSheetDesc: '모든 워크시트를 자동 변환',
          keepFormatTitle: '형식 유지',
          keepFormatDesc: '원본 표 형식을 최대한 유지',
          quickConvertTitle: '빠른 변환',
          quickConvertDesc: '빠르게 PDF 문서 생성',
        },
        pdfRotate: {
          title: 'PDF 회전',
          subtitle: 'PDF 페이지 방향을 회전, 완전 무료',
          selectFile: 'PDF 파일 선택',
          uploadDesc: '회전할 PDF 문서를 업로드하세요',
          selectFileBtn: '파일 선택',
          changeFile: '파일 변경',
          rotationLabel: '회전 각도',
          rotate90Label: '시계 방향 90°',
          rotate180Label: '180°',
          rotate270Label: '반시계 방향 90°',
          rotating: '회전 중...',
          startRotate: '회전 시작',
          successMsg: 'PDF 회전에 성공했습니다! 다운로드가 시작되었습니다',
          errorMsg: 'PDF 회전에 실패했습니다. 파일이 유효한지 확인해 주세요',
          flexibleTitle: '유연한 회전',
          flexibleDesc: '90°, 180°, 270° 회전 지원',
          keepQualityTitle: '품질 유지',
          keepQualityDesc: '회전 후에도 원본 PDF 품질 유지',
          quickDownloadTitle: '빠른 다운로드',
          quickDownloadDesc: '회전이 완료되면 즉시 다운로드',
        },
        jpgToPdf: {
          title: 'JPG를 PDF로',
          subtitle: '이미지를 PDF로 변환, 완전 무료',
          selectFile: '이미지 선택',
          supportedFormats: 'JPG, PNG 지원',
          selectFileBtn: '이미지 선택',
          clearAll: '모두 지우기',
          selectedCount: '{count}개 이미지 선택됨',
          converting: '변환 중...',
          convertToPdf: 'PDF로 변환',
          successMsg: '이미지를 PDF로 변환했습니다!',
          errorMsg: '변환에 실패했습니다',
          uploadOneImage: '최소 1장의 이미지를 업로드해 주세요',
          card1Title: '다중 이미지 병합',
          card1Desc: '여러 이미지를 하나의 PDF로',
          card2Title: '품질 유지',
          card2Desc: '원본 이미지 품질 유지',
          card3Title: '빠른 다운로드',
          card3Desc: '변환 후 즉시 다운로드',
        },
        pdfToJpg: {
          title: 'PDF를 JPG로',
          subtitle: 'PDF를 이미지로 변환, 완전 무료',
          selectFile: 'PDF 파일 선택',
          uploadDesc: '변환할 PDF 업로드',
          selectFileBtn: '파일 선택',
          changeFile: '파일 변경',
          qualityLabel: '이미지 품질',
          qualityLow: '표준',
          qualityMedium: '고화질',
          qualityHigh: '최고 화질',
          qualityLowDesc: '작은 파일',
          qualityMediumDesc: '크기와 품질 균형',
          qualityHighDesc: '최상의 결과',
          converting: '변환 중...',
          startConvert: '변환 시작',
          successMsg: 'PDF 변환 성공! {count}장 생성',
          errorMsg: '변환에 실패했습니다',
          card1Title: '고품질 변환',
          card1Desc: '원본 PDF 선명도 유지',
          card2Title: '일괄 다운로드',
          card2Desc: '모든 페이지 ZIP으로',
          card3Title: '품질 선택',
          card3Desc: '필요에 따라 품질 선택',
        },
        pdfPrint: {
          title: 'PDF 인쇄',
          subtitle: 'PDF 문서 인쇄, 완전 무료',
          selectFile: 'PDF 파일 선택',
          uploadDesc: '인쇄할 PDF 업로드',
          selectFileBtn: '파일 선택',
          changeFile: '파일 변경',
          printButton: '열기 및 인쇄',
          printHint: '아래 버튼을 클릭하면 브라우저 인쇄 대화상자가 열립니다. 프린터를 선택하여 인쇄하세요.',
          totalPages: '총 {total}페이지',
          pageRangeLabel: '인쇄할 페이지',
          pageRangePlaceholder: '전체 또는 범위 (예: 1-3,5,7-10)',
          copiesLabel: '부수',
          buildingPreview: '인쇄 미리보기 생성 중…',
        },
        pdfEdit: { title: 'PDF 편집', subtitle: 'PDF 내용 편집, 완전 무료', comingSoon: '준비 중입니다...' },
        pdfExtractPages: {
          title: '페이지 추출',
          subtitle: 'PDF 지정 페이지 추출, 완전 무료',
          selectFile: 'PDF 파일 선택',
          uploadDesc: '페이지를 추출할 PDF 업로드',
          selectFileBtn: '파일 선택',
          changeFile: '파일 변경',
          totalPages: '총 {total}페이지',
          pageRangeLabel: '페이지 범위',
          pageRangePlaceholder: '예: 1,3,5-8,10',
          formatHelp: '형식:',
          formatSingle: '단일: 1,3,5',
          formatRange: '범위: 1-5,8-10',
          formatMixed: '혼합: 1,3-5,8,10-12',
          extracting: '추출 중...',
          startExtract: '페이지 추출',
          successMsg: '{count}페이지 추출 완료! 다운로드 시작',
          errorMsg: '추출에 실패했습니다',
          invalidRange: '유효한 페이지 범위를 입력하세요',
          readError: 'PDF를 읽을 수 없습니다',
          card1Title: '유연한 추출',
          card1Desc: '단일·범위 추출 지원',
          card2Title: '품질 유지',
          card2Desc: '무손실 추출',
          card3Title: '빠른 처리',
          card3Desc: '빠르게 새 PDF 생성',
        },
        pdfPageNumber: {
          title: '페이지 번호 추가',
          subtitle: 'PDF에 페이지 번호 추가, 완전 무료',
          selectFile: 'PDF 파일 선택',
          uploadDesc: '페이지 번호를 추가할 PDF 업로드',
          selectFileBtn: '파일 선택',
          changeFile: '파일 변경',
          totalPages: '총 {total}페이지',
          positionLabel: '위치',
          positionBottomCenter: '하단 중앙',
          positionBottomRight: '하단 오른쪽',
          positionBottomLeft: '하단 왼쪽',
          positionTopCenter: '상단 중앙',
          positionTopRight: '상단 오른쪽',
          positionTopLeft: '상단 왼쪽',
          startNumberLabel: '시작 번호',
          fontSizeLabel: '글꼴 크기',
          previewTitle: '미리보기',
          previewPosition: '위치',
          previewStart: '시작 번호',
          previewFontSize: '글꼴 크기',
          previewRange: '페이지 범위',
          adding: '추가 중...',
          startAdd: '페이지 번호 추가',
          successMsg: '{count}페이지에 번호 추가 완료!',
          errorMsg: '추가에 실패했습니다',
          readError: 'PDF를 읽을 수 없습니다',
          card1Title: '위치 선택',
          card1Desc: '6가지 위치 옵션',
          card2Title: '시작 번호',
          card2Desc: '임의의 시작 번호 설정',
          card3Title: '글꼴 크기',
          card3Desc: '페이지 번호 크기 조절',
        },
        pdfWatermark: {
          title: '워터마크 추가',
          subtitle: 'PDF에 텍스트 또는 이미지 워터마크 추가, 완전 무료',
          selectFile: 'PDF 파일 선택',
          uploadDesc: '워터마크를 추가할 PDF 업로드',
          selectFileBtn: '파일 선택',
          changeFile: '파일 변경',
          totalPages: '총 {total}페이지',
          typeLabel: '워터마크 유형',
          typeText: '텍스트',
          typeImage: '이미지',
          typeTextDesc: '텍스트 워터마크',
          typeImageDesc: '이미지 워터마크',
          textLabel: '워터마크 텍스트',
          textPlaceholder: '워터마크 텍스트 입력',
          fontSizeLabel: '글꼴 크기',
          imageLabel: '워터마크 이미지',
          selectImageHint: '클릭하여 이미지 선택 (PNG, JPG)',
          remove: '제거',
          opacityLabel: '투명도',
          rotationLabel: '회전',
          adding: '추가 중...',
          startAdd: '워터마크 추가',
          successMsg: '{count}페이지에 워터마크 추가 완료!',
          errorMsg: '워터마크 추가 실패',
          enterText: '워터마크 텍스트를 입력하세요',
          selectImage: '워터마크 이미지를 선택하세요',
          readError: 'PDF를 읽을 수 없습니다',
          card1Title: '텍스트 워터마크',
          card1Desc: '텍스트 및 글꼴 크기 설정',
          card2Title: '이미지 워터마크',
          card2Desc: 'PNG, JPG 지원',
          card3Title: '스타일',
          card3Desc: '투명도와 회전 조절',
        },
        pdfDeletePages: {
          title: '페이지 삭제',
          subtitle: 'PDF 지정 페이지 삭제, 완전 무료',
          selectFile: 'PDF 파일 선택',
          uploadDesc: '페이지를 삭제할 PDF 업로드',
          selectFileBtn: '파일 선택',
          changeFile: '파일 변경',
          totalPages: '총 {total}페이지',
          noticeTitle: '안내',
          noticeDesc: '삭제는 되돌릴 수 없습니다. 삭제할 범위를 확인하세요. 모든 페이지를 삭제할 수 없습니다.',
          pageRangeLabel: '삭제할 페이지 범위',
          pageRangePlaceholder: '예: 1,3,5-8,10',
          formatHelp: '형식:',
          formatSingle: '단일: 1,3,5',
          formatRange: '범위: 1-5,8-10',
          formatMixed: '혼합: 1,3-5,8,10-12',
          deleting: '삭제 중...',
          startDelete: '페이지 삭제',
          successMsg: '{deleted}페이지 삭제 완료! {remaining}페이지 남음',
          errorMsg: '삭제에 실패했습니다',
          invalidRange: '유효한 페이지 범위를 입력하세요',
          cannotDeleteAll: '모든 페이지를 삭제할 수 없습니다',
          readError: 'PDF를 읽을 수 없습니다',
          card1Title: '정확한 삭제',
          card1Desc: '단일·범위 삭제',
          card2Title: '품질 유지',
          card2Desc: '남은 페이지 품질 유지',
          card3Title: '안전',
          card3Desc: '전체 삭제 방지',
        },
      },
    },
    errors: {
      fileRequired: '파일을 선택해주세요',
      processingFailed: '처리에 실패했습니다. 나중에 다시 시도해주세요',
      loginFailed: '로그인에 실패했습니다. 나중에 다시 시도해주세요',
      signupFailed: '가입에 실패했습니다. 나중에 다시 시도해주세요',
      networkError: '네트워크 오류입니다. 연결을 확인해주세요',
      unauthorized: '인증되지 않았습니다. 다시 로그인해주세요',
      notFound: '페이지를 찾을 수 없습니다',
      serverError: '서버 오류입니다. 나중에 다시 시도해주세요',
      passwordMismatch: '새 비밀번호와 확인이 일치하지 않습니다',
    },
    settings: {
      pageTitle: '계정 설정',
      pageSubtitle: '보안 및 환경설정 관리',
      profile: '프로필',
      security: '보안',
      notifications: '알림',
      dangerZone: '위험 작업',
      personalInfo: '개인 정보',
      name: '이름',
      namePlaceholder: '이름 입력',
      email: '이메일',
      emailReadonly: '이메일은 변경할 수 없습니다',
      saveChanges: '저장',
      saving: '저장 중...',
      currentPassword: '현재 비밀번호',
      currentPasswordPlaceholder: '현재 비밀번호 입력',
      newPassword: '새 비밀번호',
      newPasswordPlaceholder: '새 비밀번호 (6자 이상)',
      confirmPassword: '비밀번호 확인',
      confirmPasswordPlaceholder: '다시 입력',
      changePassword: '비밀번호 변경',
      changing: '변경 중...',
      emailNotifications: '이메일 알림',
      emailNotificationsDesc: '계정 관련 중요 메일 수신',
      planExpiryReminder: '요금제 만료 알림',
      planExpiryReminderDesc: '요금제 만료 전 알림',
      usageReminder: '사용량 알림',
      usageReminderDesc: '사용량 80% 도달 시 알림',
      deleteAccount: '계정 삭제',
      deleteAccountDesc: '계정을 삭제하면 문서 및 구독 정보를 포함한 모든 데이터가 영구 삭제됩니다. 되돌릴 수 없습니다.',
      deleteAccountButton: '내 계정 삭제',
      confirmDeleteTitle: '계정 삭제 확인',
      confirmDeleteSubtitle: '이 작업은 되돌릴 수 없습니다',
      confirmDeleteBody: '계정을 삭제하시겠습니까? 다음 데이터가 영구 삭제됩니다:',
      confirmDeleteList1: '처리된 문서',
      confirmDeleteList2: '구독 및 결제 정보',
      confirmDeleteList3: '초대 기록 및 보상',
      confirmDeleteList4: '개인 설정',
      confirmDeleteButton: '삭제 확인',
      cancel: '취소',
      deleteConfirmPrompt: '계정을 삭제하시겠습니까? 되돌릴 수 없습니다!',
      profileTab: '프로필',
      securityTab: '보안',
      notificationsTab: '알림',
      dangerTab: '위험 작업',
    },
    profile: {
      pageTitle: '프로필',
      pageSubtitle: '계정 및 구독 정보 관리',
      basicInfo: '기본 정보',
      edit: '편집',
      namePlaceholder: '이름 입력',
      notSetName: '미설정',
      planFree: '무료',
      planMonthly: '프로',
      planYearly: '연간',
    },
  },
} as Record<Language, Translations>;

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Record<string, unknown> ? DeepPartial<T[K]> : T[K];
};

// 深度合并：用 partial 覆盖 base 中的同名字段（递归），用于法语/西班牙语等部分翻译
function deepMergeTranslations<T extends Record<string, unknown>>(base: T, partial: DeepPartial<T>): T {
  const result = { ...base };
  for (const key of Object.keys(partial) as (keyof T)[]) {
    const pVal = partial[key];
    if (pVal === undefined) continue;
    const bVal = result[key];
    if (typeof pVal === 'object' && pVal !== null && !Array.isArray(pVal) && typeof bVal === 'object' && bVal !== null && !Array.isArray(bVal)) {
      (result as Record<string, unknown>)[key as string] = deepMergeTranslations(bVal as Record<string, unknown>, pVal as Record<string, unknown>);
    } else {
      (result as Record<string, unknown>)[key as string] = pVal;
    }
  }
  return result;
}

// 法语部分翻译（与 en 合并后使用）
const partialFr: DeepPartial<Translations> = {
  common: {
    home: 'Accueil',
    about: 'À propos',
    pricing: 'Tarifs',
    support: 'Support',
    login: 'Connexion',
    signup: 'Inscription',
    logout: 'Déconnexion',
    dashboard: 'Tableau de bord',
    profile: 'Profil',
    settings: 'Paramètres',
    tools: 'Outils',
    save: 'Enregistrer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    close: 'Fermer',
    confirm: 'Confirmer',
    loading: 'Chargement',
    error: 'Erreur',
    success: 'Succès',
    back: 'Retour',
    next: 'Suivant',
    previous: 'Précédent',
    search: 'Rechercher',
    filter: 'Filtrer',
    export: 'Exporter',
    import: 'Importer',
    copy: 'Copier',
    paste: 'Coller',
    cut: 'Couper',
    undo: 'Annuler',
    redo: 'Rétablir',
    pagesUnit: 'pages',
    adminBadge: 'Admin',
    upgradePlan: 'Améliorer',
    adminPanel: 'Admin',
    usageLabel: 'Utilisation',
    remaining: 'Restant',
    inviteReward: 'Parrainage',
    invitedCount: 'Invités',
    earnedPages: 'Gagnées',
    inviteCodeLabel: 'Code parrain',
    subscription: 'Abonnement',
  },
  navbar: {
    brand: 'PDF Extract AI',
    features: 'Fonctionnalités',
    pricing: 'Tarifs',
    support: 'Support',
    login: 'Connexion',
    signup: 'Inscription',
    getStarted: 'Commencer',
    noLoginRequired: 'Sans connexion',
    aiToolsNeedPro: 'Abonnement Pro',
    allTools: 'Tous les outils',
  },
  home: {
    title: 'Extraction PDF par IA',
    subtitle: 'Extraire les données structurées des PDF',
    description: 'Extraction rapide et précise vers Excel.',
    startFree: 'Commencer gratuitement',
    learnMore: 'En savoir plus',
    features: {
      aiExtraction: { title: 'Extraction IA', description: 'Reconnaissance précise des documents' },
      multiFormat: { title: 'Multi-format', description: 'PDF, images, Excel, CSV' },
      fastProcessing: { title: 'Rapide', description: 'Traitement en quelques secondes' },
    },
    heroTitle: 'De PDF vers Excel',
    heroSubtitle: "L'IA extrait les données dont vous avez besoin",
    noCreditCard: 'Sans carte bancaire',
    pagesFree: '300 pages gratuites',
    dragDropHere: 'Glissez les fichiers ici',
    supportedFormats: 'PDF / Images / JSON',
    browseFiles: 'Parcourir',
    tabInvoice: 'Facture',
    tabPurchaseOrder: 'Bon de commande',
    tabQuotation: 'Devis',
    tabMore: 'Plus...',
    tableInvoiceNo: 'N° facture',
    tableDate: 'Date',
    tableBillTo: 'Facturer à',
    tableAmount: 'Montant',
    tableTotal: 'Total',
    requirementsLabel: 'Décrivez vos besoins',
    requirementsPlaceholder: 'Ex : extraire montant et date de la facture',
    startConversion: 'Lancer la conversion',
    optionDateFormat: 'Date au format AA-MM-JJ',
    optionAmountWithTax: 'Montant TTC',
    optionFileHint: 'Indiquez le fichier après la dernière colonne',
    howItWorksTitle: 'Comment ça marche',
    howItWorksSubtitle: 'En trois étapes',
    step1Title: 'Reconnaissance du document',
    step1Desc: 'Identification du texte et des tableaux',
    step2Title: 'Compréhension des besoins',
    step2Desc: "Interprétation de vos instructions en langage naturel",
    step3Title: 'Export vers Excel',
    step3Desc: 'Génération du fichier Excel',
    ctaTitle: 'Prêt à simplifier votre travail ?',
  },
  footer: {
    aiTools: 'Outils IA',
    aiPdfExtract: 'Extraction PDF',
    aiImageExtract: 'Extraction image',
    pdfTools: 'Outils PDF',
    mergePdf: 'Fusionner PDF',
    splitPdf: 'Diviser PDF',
    compressPdf: 'Compresser PDF',
    rotatePdf: 'Pivoter PDF',
    printPdf: 'Imprimer PDF',
    convertExport: 'Convertir',
    excelToPdf: 'Excel vers PDF',
    jpgToPdf: 'JPG vers PDF',
    pdfToJpg: 'PDF vers JPG',
    editTools: 'Édition',
    editPdf: 'Éditer PDF',
    extractPages: 'Extraire des pages',
    addPageNumber: 'Numéroter',
    addWatermark: 'Filigrane',
    deletePages: 'Supprimer des pages',
    customerSupport: 'Support',
    support: 'Support',
    aboutUs: 'À propos',
    privacyPolicy: 'Confidentialité',
    termsOfService: 'Conditions',
  },
  login: {
    title: 'Connexion',
    subtitle: 'Déjà un compte ? Connectez-vous',
    email: 'E-mail',
    password: 'Mot de passe',
    loginButton: 'Connexion',
    loggingIn: 'Connexion...',
    noAccount: 'Pas de compte ?',
    signupPrompt: 'Inscrivez-vous pour 300 pages gratuites',
    freeSignup: 'Inscription gratuite',
    backToHome: '← Accueil',
  },
  signup: {
    title: 'Inscription',
    subtitle: '300 pages gratuites',
    name: 'Nom',
    email: 'E-mail',
    password: 'Mot de passe',
    inviteCode: 'Code parrain (optionnel)',
    inviteCodePlaceholder: 'Code pour 100 pages en plus',
    inviteBonus: 'Avec un code parrain : +100 pages !',
    signupButton: 'S\'inscrire',
    signingUp: 'Inscription...',
    hasAccount: 'Déjà un compte ?',
    loginNow: 'Connexion',
    backToHome: '← Accueil',
    passwordMinLength: '6 caractères minimum',
  },
  tools: {
    title: 'Outils PDF',
    subtitle: 'Outils de traitement PDF',
    categories: {
      aiTools: { name: 'Outils IA', description: 'Extraction par IA', badge: 'Pro' },
      pdfUtils: { name: 'Outils PDF', description: 'Outils courants', badge: 'Gratuit' },
      convert: { name: 'Conversion', description: 'Convertir et exporter', badge: 'Gratuit' },
      edit: { name: 'Édition', description: 'Modifier les PDF', badge: 'Gratuit' },
    },
    toolNames: {
      aiPdfExtract: 'Extraction PDF IA',
      aiImageExtract: 'Extraction image IA',
      pdfMerge: 'Fusionner PDF',
      pdfSplit: 'Diviser PDF',
      pdfCompress: 'Compresser PDF',
      pdfRotate: 'Pivoter PDF',
      pdfPrint: 'Imprimer PDF',
      excelToPdf: 'Excel vers PDF',
      jpgToPdf: 'JPG vers PDF',
      pdfToJpg: 'PDF vers JPG',
      pdfEdit: 'Éditer PDF',
      pdfExtractPages: 'Extraire des pages',
      pdfPageNumber: 'Numéroter',
      pdfWatermark: 'Filigrane',
      pdfDeletePages: 'Supprimer des pages',
    },
    descriptions: {
      aiPdfExtract: 'Extraire les données PDF vers Excel',
      aiImageExtract: 'Extraire les données des images',
      pdfMerge: 'Fusionner plusieurs PDF',
      pdfSplit: 'Diviser un PDF',
      pdfCompress: 'Réduire la taille',
      pdfRotate: 'Pivoter les pages',
      pdfPrint: 'Imprimer un PDF',
      excelToPdf: 'Convertir Excel en PDF',
      jpgToPdf: 'Convertir images en PDF',
      pdfToJpg: 'Convertir PDF en images',
      pdfEdit: 'Modifier le contenu',
      pdfExtractPages: 'Extraire des pages',
      pdfPageNumber: 'Ajouter des numéros',
      pdfWatermark: 'Ajouter un filigrane',
      pdfDeletePages: 'Supprimer des pages',
    },
  },
  pricing: {
    title: 'Choisissez votre offre',
    subtitle: 'Tarifs adaptés à vos besoins',
    free: {
      name: 'Gratuit',
      price: '0 €',
      description: 'Pour essayer',
      features: ['300 pages gratuites', 'Extraction IA de base', 'Vitesse standard', 'Support communautaire'],
      button: 'Commencer',
    },
    monthly: {
      name: 'Pro',
      price: '9,9 $',
      description: 'Pour un usage régulier',
      features: ['2000 pages/mois', '~0,005 $/page', 'Export illimité', 'Support prioritaire'],
      button: 'S\'abonner',
      recommended: 'Recommandé',
    },
    yearly: {
      name: 'Annuel',
      price: '107 $',
      description: 'Pour une utilisation intensive',
      features: ['20400 pages/an', '~0,005 $/page', 'Export illimité', 'Support prioritaire', 'Économisez 10 %'],
      button: 'S\'abonner',
      bestValue: 'Meilleure valeur',
    },
  },
};

// 西班牙语部分翻译（与 en 合并后使用）
const partialEs: DeepPartial<Translations> = {
  common: {
    home: 'Inicio',
    about: 'Nosotros',
    pricing: 'Precios',
    support: 'Soporte',
    login: 'Iniciar sesión',
    signup: 'Registrarse',
    logout: 'Cerrar sesión',
    dashboard: 'Panel',
    profile: 'Perfil',
    settings: 'Ajustes',
    tools: 'Herramientas',
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    close: 'Cerrar',
    confirm: 'Confirmar',
    loading: 'Cargando',
    error: 'Error',
    success: 'Éxito',
    back: 'Atrás',
    next: 'Siguiente',
    previous: 'Anterior',
    search: 'Buscar',
    filter: 'Filtrar',
    export: 'Exportar',
    import: 'Importar',
    copy: 'Copiar',
    paste: 'Pegar',
    cut: 'Cortar',
    undo: 'Deshacer',
    redo: 'Rehacer',
    pagesUnit: 'páginas',
    adminBadge: 'Admin',
    upgradePlan: 'Mejorar',
    adminPanel: 'Admin',
    usageLabel: 'Uso',
    remaining: 'Restante',
    inviteReward: 'Invitaciones',
    invitedCount: 'Invitados',
    earnedPages: 'Ganadas',
    inviteCodeLabel: 'Código de invitación',
    subscription: 'Suscripción',
  },
  navbar: {
    brand: 'PDF Extract AI',
    features: 'Funciones',
    pricing: 'Precios',
    support: 'Soporte',
    login: 'Iniciar sesión',
    signup: 'Registrarse',
    getStarted: 'Empezar',
    noLoginRequired: 'Sin registro',
    aiToolsNeedPro: 'Requiere Pro',
    allTools: 'Todas las herramientas',
  },
  home: {
    title: 'Extracción de datos PDF con IA',
    subtitle: 'Extrae datos estructurados de PDF',
    description: 'Extracción rápida y precisa a Excel.',
    startFree: 'Empezar gratis',
    learnMore: 'Saber más',
    features: {
      aiExtraction: { title: 'Extracción IA', description: 'Reconocimiento preciso de documentos' },
      multiFormat: { title: 'Multi-formato', description: 'PDF, imágenes, Excel, CSV' },
      fastProcessing: { title: 'Rápido', description: 'Procesamiento en segundos' },
    },
    heroTitle: 'De PDF a Excel',
    heroSubtitle: 'La IA extrae los datos que necesitas',
    noCreditCard: 'Sin tarjeta',
    pagesFree: '300 páginas gratis',
    dragDropHere: 'Arrastra archivos aquí',
    supportedFormats: 'PDF / Imágenes / JSON',
    browseFiles: 'Explorar',
    tabInvoice: 'Factura',
    tabPurchaseOrder: 'Orden de compra',
    tabQuotation: 'Cotización',
    tabMore: 'Más...',
    tableInvoiceNo: 'Nº factura',
    tableDate: 'Fecha',
    tableBillTo: 'Facturar a',
    tableAmount: 'Importe',
    tableTotal: 'Total',
    requirementsLabel: 'Describe lo que necesitas',
    requirementsPlaceholder: 'Ej: extraer importe y fecha de la factura',
    startConversion: 'Iniciar conversión',
    optionDateFormat: 'Fecha en formato AA-MM-DD',
    optionAmountWithTax: 'Importe con impuestos',
    optionFileHint: 'Indica el archivo tras la última columna',
    howItWorksTitle: 'Cómo funciona',
    howItWorksSubtitle: 'En tres pasos',
    step1Title: 'Reconocimiento del documento',
    step1Desc: 'Identificación de texto y tablas',
    step2Title: 'Comprensión de necesidades',
    step2Desc: 'Interpretación de tus instrucciones en lenguaje natural',
    step3Title: 'Exportar a Excel',
    step3Desc: 'Generación del archivo Excel',
    ctaTitle: '¿Listo para simplificar tu trabajo?',
  },
  footer: {
    aiTools: 'Herramientas IA',
    aiPdfExtract: 'Extracción PDF',
    aiImageExtract: 'Extracción imagen',
    pdfTools: 'Herramientas PDF',
    mergePdf: 'Combinar PDF',
    splitPdf: 'Dividir PDF',
    compressPdf: 'Comprimir PDF',
    rotatePdf: 'Rotar PDF',
    printPdf: 'Imprimir PDF',
    convertExport: 'Convertir',
    excelToPdf: 'Excel a PDF',
    jpgToPdf: 'JPG a PDF',
    pdfToJpg: 'PDF a JPG',
    editTools: 'Edición',
    editPdf: 'Editar PDF',
    extractPages: 'Extraer páginas',
    addPageNumber: 'Numerar',
    addWatermark: 'Marca de agua',
    deletePages: 'Eliminar páginas',
    customerSupport: 'Soporte',
    support: 'Soporte',
    aboutUs: 'Nosotros',
    privacyPolicy: 'Privacidad',
    termsOfService: 'Términos',
  },
  login: {
    title: 'Iniciar sesión',
    subtitle: '¿Ya tienes cuenta? Entra',
    email: 'Correo',
    password: 'Contraseña',
    loginButton: 'Entrar',
    loggingIn: 'Entrando...',
    noAccount: '¿Sin cuenta?',
    signupPrompt: 'Regístrate y obtén 300 páginas gratis',
    freeSignup: 'Registro gratis',
    backToHome: '← Inicio',
  },
  signup: {
    title: 'Registro',
    subtitle: '300 páginas gratis',
    name: 'Nombre',
    email: 'Correo',
    password: 'Contraseña',
    inviteCode: 'Código de invitación (opcional)',
    inviteCodePlaceholder: 'Código para 100 páginas más',
    inviteBonus: 'Con código de invitación: ¡+100 páginas!',
    signupButton: 'Registrarse',
    signingUp: 'Registrando...',
    hasAccount: '¿Ya tienes cuenta?',
    loginNow: 'Iniciar sesión',
    backToHome: '← Inicio',
    passwordMinLength: 'Mínimo 6 caracteres',
  },
  tools: {
    title: 'Herramientas PDF',
    subtitle: 'Herramientas de tratamiento PDF',
    categories: {
      aiTools: { name: 'Herramientas IA', description: 'Extracción con IA', badge: 'Pro' },
      pdfUtils: { name: 'Herramientas PDF', description: 'Herramientas habituales', badge: 'Gratis' },
      convert: { name: 'Conversión', description: 'Convertir y exportar', badge: 'Gratis' },
      edit: { name: 'Edición', description: 'Editar PDF', badge: 'Gratis' },
    },
    toolNames: {
      aiPdfExtract: 'Extracción PDF IA',
      aiImageExtract: 'Extracción imagen IA',
      pdfMerge: 'Combinar PDF',
      pdfSplit: 'Dividir PDF',
      pdfCompress: 'Comprimir PDF',
      pdfRotate: 'Rotar PDF',
      pdfPrint: 'Imprimir PDF',
      excelToPdf: 'Excel a PDF',
      jpgToPdf: 'JPG a PDF',
      pdfToJpg: 'PDF a JPG',
      pdfEdit: 'Editar PDF',
      pdfExtractPages: 'Extraer páginas',
      pdfPageNumber: 'Numerar',
      pdfWatermark: 'Marca de agua',
      pdfDeletePages: 'Eliminar páginas',
    },
    descriptions: {
      aiPdfExtract: 'Extraer datos PDF a Excel',
      aiImageExtract: 'Extraer datos de imágenes',
      pdfMerge: 'Combinar varios PDF',
      pdfSplit: 'Dividir un PDF',
      pdfCompress: 'Reducir tamaño',
      pdfRotate: 'Rotar páginas',
      pdfPrint: 'Imprimir PDF',
      excelToPdf: 'Convertir Excel a PDF',
      jpgToPdf: 'Convertir imágenes a PDF',
      pdfToJpg: 'Convertir PDF a imágenes',
      pdfEdit: 'Modificar contenido',
      pdfExtractPages: 'Extraer páginas',
      pdfPageNumber: 'Añadir números',
      pdfWatermark: 'Añadir marca de agua',
      pdfDeletePages: 'Eliminar páginas',
    },
  },
  pricing: {
    title: 'Elige tu plan',
    subtitle: 'Precios según tus necesidades',
    free: {
      name: 'Gratis',
      price: '0 €',
      description: 'Para probar',
      features: ['300 páginas gratis', 'Extracción IA básica', 'Velocidad estándar', 'Soporte comunitario'],
      button: 'Empezar',
    },
    monthly: {
      name: 'Pro',
      price: '9,9 $',
      description: 'Para uso regular',
      features: ['2000 páginas/mes', '~0,005 $/página', 'Exportación ilimitada', 'Soporte prioritario'],
      button: 'Suscribirse',
      recommended: 'Recomendado',
    },
    yearly: {
      name: 'Anual',
      price: '107 $',
      description: 'Para uso intensivo',
      features: ['20400 páginas/año', '~0,005 $/página', 'Exportación ilimitada', 'Soporte prioritario', 'Ahorra 10 %'],
      button: 'Suscribirse',
      bestValue: 'Mejor valor',
    },
  },
};

// 将法语、西班牙语与英文合并后写入，供 getTranslation 使用
const _tr = translations as Record<string, Translations>;
_tr.fr = deepMergeTranslations(
  translations.en as unknown as Record<string, unknown>,
  partialFr as unknown as Record<string, unknown>
) as unknown as Translations;
_tr.es = deepMergeTranslations(
  translations.en as unknown as Record<string, unknown>,
  partialEs as unknown as Record<string, unknown>
) as unknown as Translations;
// 德语、葡萄牙语、意大利语暂用英文，后续可补充翻译
_tr.de = translations.en;
_tr.pt = translations.en;
_tr.it = translations.en;

const VALID_LANGUAGES: Language[] = ['zh', 'en', 'ja', 'ko', 'fr', 'es', 'de', 'pt', 'it'];

// 语言检测和存储
export const getStoredLanguage = (): Language => {
  if (typeof window === 'undefined') return 'zh';
  
  try {
    const stored = localStorage.getItem('language') as Language;
    if (stored && VALID_LANGUAGES.includes(stored)) {
      return stored;
    }
    
    // 根据浏览器语言自动检测
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) return 'zh';
    if (browserLang.startsWith('ja')) return 'ja';
    if (browserLang.startsWith('ko')) return 'ko';
    if (browserLang.startsWith('en')) return 'en';
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('es')) return 'es';
    if (browserLang.startsWith('de')) return 'de';
    if (browserLang.startsWith('pt')) return 'pt';
    if (browserLang.startsWith('it')) return 'it';
    
    return 'zh'; // 默认中文
  } catch (error) {
    console.error('Error getting stored language:', error);
    return 'zh';
  }
};

export const setStoredLanguage = (language: Language) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('language', language);
      // 同步到 cookie，便于服务端/下次请求首屏使用正确语言
      document.cookie = `language=${language};path=/;max-age=31536000;SameSite=Lax`;
    } catch (error) {
      console.error('Error setting stored language:', error);
    }
  }
};

export function parseLanguageFromCookie(value: string | undefined): Language {
  if (!value || typeof value !== 'string') return 'zh';
  const v = value.trim().toLowerCase();
  return VALID_LANGUAGES.includes(v as Language) ? (v as Language) : 'zh';
}

export const getTranslation = (language: Language) => {
  return (translations as Record<string, Translations>)[language] || translations.zh;
};

// 语言选项（法语、西班牙语为真实翻译；德语、葡萄牙语、意大利语暂用英文）
export const languageOptions = [
  { code: 'zh' as Language, name: '中文', flag: '🇨🇳' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' },
  { code: 'ko' as Language, name: '한국어', flag: '🇰🇷' },
  { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
  { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt' as Language, name: 'Português', flag: '🇵🇹' },
  { code: 'it' as Language, name: 'Italiano', flag: '🇮🇹' },
];
