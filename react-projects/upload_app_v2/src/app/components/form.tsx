"use client";
import { useState } from "react";

export const Form = () => {
  const [uploadedFilePath, setUploadedFilePath] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  return (
    <div>
      <input
        type="file"
        name="file"
        onChange={async (e) => {
          if (e.target.files) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("file", file);

            // Get the file extension/type
            const fileExtension = file.name.split(".").pop()?.toLowerCase();
            setFileType(fileExtension);

            const response = await fetch("/api/upload", {
              method: "POST",
              body: formData,
            });

            const result = await response.json();
            if (result.success) {
              alert("Upload ok: " + result.name);
              setUploadedFilePath(`/uploads/${result.name}`); // Store file path
            } else if (result.message === "File already exists") {
              alert("File already exists!");
            } else {
              alert("Upload failed");
            }
          }
        }}
      />

      {uploadedFilePath && (
        <div className="mt-4">
          <h3>Uploaded File Preview:</h3>
          {fileType === "pdf" && (
            <iframe
              src={uploadedFilePath}
              width="250%"
              height="500px"
              className="border"
            ></iframe>
          )}
          {(fileType === "doc" || fileType === "docx" || fileType === "xls" || fileType === "xlsx") && (
            <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(window.location.origin + uploadedFilePath)}`}
              width="100%"
              height="500px"
              className="border"
              title="Document Preview"
            ></iframe>
          )}
          {fileType === "jpg" || fileType === "png" || fileType === "jpeg" || fileType === "gif" ? (
            <img
              src={uploadedFilePath}
              alt="Uploaded Image"
              className="mt-4"
              width="500px"
            />
          ) : null}
        </div>
      )}
    </div>
  );
};
