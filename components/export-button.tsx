"use client";

type ExportButtonProps = {
  filename: string;
  content: string;
};

export function ExportButton({ filename, content }: ExportButtonProps) {
  function handleExport() {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button className="ghost-button" type="button" onClick={handleExport}>
      Export CSV
    </button>
  );
}
