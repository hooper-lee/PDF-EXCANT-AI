export type Language = 'zh' | 'en' | 'ja' | 'ko';

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
  };
}

export const translations: Record<Language, Translations> = {
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
    },
    navbar: {
      brand: 'PDF Extract AI',
      features: '功能',
      pricing: '定价',
      support: '支持',
      login: '登录',
      signup: '注册',
      getStarted: '开始使用',
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
    },
    navbar: {
      brand: 'PDF Extract AI',
      features: 'Features',
      pricing: 'Pricing',
      support: 'Support',
      login: 'Login',
      signup: 'Sign Up',
      getStarted: 'Get Started',
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
    },
    navbar: {
      brand: 'PDF Extract AI',
      features: '機能',
      pricing: '料金',
      support: 'サポート',
      login: 'ログイン',
      signup: '登録',
      getStarted: '始める',
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
    },
    navbar: {
      brand: 'PDF Extract AI',
      features: '기능',
      pricing: '요금제',
      support: '지원',
      login: '로그인',
      signup: '회원가입',
      getStarted: '시작하기',
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
    },
  },
};

// 语言检测和存储
export const getStoredLanguage = (): Language => {
  if (typeof window === 'undefined') return 'zh';
  
  try {
    const stored = localStorage.getItem('language') as Language;
    if (stored && ['zh', 'en', 'ja', 'ko'].includes(stored)) {
      return stored;
    }
    
    // 根据浏览器语言自动检测
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) return 'zh';
    if (browserLang.startsWith('ja')) return 'ja';
    if (browserLang.startsWith('ko')) return 'ko';
    if (browserLang.startsWith('en')) return 'en';
    
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
    } catch (error) {
      console.error('Error setting stored language:', error);
    }
  }
};

export const getTranslation = (language: Language) => {
  return translations[language] || translations.zh;
};

// 语言选项
export const languageOptions = [
  { code: 'zh' as Language, name: '中文', flag: '🇨🇳' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' },
  { code: 'ko' as Language, name: '한국어', flag: '🇰🇷' },
];