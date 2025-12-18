import React from "react";

export default function About() {
  return (
    <div className="bg-dark text-light min-vh-100 py-5">
      <div className="container text-center">
        <h1 className="mb-4">الشيخ علاء حامد</h1>

        <img
          src="https://cvtlkqqnoqcwvzvlazyz.supabase.co/storage/v1/object/public/courses-bucket/courses/unnamed.jpg"
          alt="الشيخ علاء حامد"
          className="img-fluid rounded mb-4"
          style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
        />

        <p className="fs-5 text-secondary">
          الشيخ علاء حامد، داعية إسلامي، متخصص في شرح القرآن الكريم والسيرة النبوية.  
          يقدم الدروس بأسلوب سهل وميسر، ويسعى لنشر العلم الشرعي بطريقة عملية تناسب جميع الأعمار.
        </p>

        <p className="fs-6 text-secondary mt-3">
          يمكنك متابعة الدروس والمحاضرات من خلال المنصة والاطلاع على جميع الكورسات المتاحة.
        </p>
      </div>
    </div>
  );
}
