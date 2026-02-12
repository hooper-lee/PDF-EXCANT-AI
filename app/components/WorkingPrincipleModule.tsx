'use client';

import { FileText, MessageSquare, Table2 } from 'lucide-react';

const steps = [
  {
    step: 1,
    icon: FileText,
    title: '智能识别文档内容',
    description:
      '结合大模型和 OCR 技术，精准识别 PDF、图片、Word 等各类文档中的文字、表格和结构信息',
  },
  {
    step: 2,
    icon: MessageSquare,
    title: '理解用户需求',
    description:
      '利用 LLM 的强大能力，深度理解您的自然语言指令，准确捕捉提取需求和数据格式要求',
  },
  {
    step: 3,
    icon: Table2,
    title: '提取到 Excel',
    description:
      '将识别和理解的内容智能提取并结构化，生成你想要的 Excel 内容，可直接导出使用',
  },
];

/** 首页 - 工作原理模块：PDF Extract AI 三步智能处理（不出现 transez） */
export default function WorkingPrincipleModule() {
  return (
    <section className="py-16 bg-white" aria-label="工作原理">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            PDF Extract AI 工作原理
          </h2>
          <p className="text-lg text-gray-600">
            三步智能处理，让文档工作变得简单高效
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map(({ step, icon: Icon, title, description }) => (
            <div
              key={step}
              className="relative bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <span className="absolute top-4 left-4 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {step}
              </span>
              <div className="mt-2 mb-4 flex justify-center">
                <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center">
                  <Icon className="w-7 h-7 text-amber-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
