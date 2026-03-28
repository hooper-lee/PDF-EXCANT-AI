export function assertExtractableFile(file: File | null | undefined): asserts file is File {
  if (!file) {
    throw new Error('请上传文件');
  }

  if (file.type !== 'application/pdf' && !file.type.startsWith('image/')) {
    throw new Error('不支持的文件类型');
  }
}

export function getExtractedWorkbookFilename(originalName: string): string {
  return `${originalName.replace(/\.pdf$/i, '')}_extracted.xlsx`;
}
