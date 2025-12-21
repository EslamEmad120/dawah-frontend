import React from "react";

export default function About() {
  return (
    <div className="bg-dark text-light min-vh-100 py-5">
      <div className="container">

        {/* ====== Section 1 : About Sheikh ====== */}
        <div className="row align-items-center mb-5">
          {/* Image */}
          <div className="col-md-5 mb-4 mb-md-0">
            <img
              src="https://cvtlkqqnoqcwvzvlazyz.supabase.co/storage/v1/object/public/courses-bucket/lessons/alaaHemed.jpeg"
              alt="الشيخ علاء حامد"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "420px", objectFit: "cover", width: "100%" }}
            />
          </div>

          {/* Content */}
          <div className="col-md-7 text-end">
            <h1 className="mb-3">مهندس علاء حامد</h1>
            <p className="fs-5 text-secondary">
              المهندس علاء حامد داعية إسلامي مهتم بتدبر القرآن، ويقدم العلم الشرعي بأسلوب مبسط
            </p>
            <p className="fs-6 text-secondary">
              يهدف إلى نشر الوعي الديني الصحيح وتقديم محتوى علمي يناسب مختلف الأعمار والمستويات.
            </p>
          </div>
        </div>

        {/* ====== Section 2 : Works ====== */}
        <div className="border-top pt-5">
          <h2 className="text-center mb-4">مؤلفات الشيخ</h2>

          <div className="row g-4">

            {/* Book 1 */}
            <div className="col-md-4 d-flex">
              <div className="bg-black p-3 rounded shadow text-center w-100 d-flex flex-column">
                <img
                  src="https://cvtlkqqnoqcwvzvlazyz.supabase.co/storage/v1/object/public/courses-bucket/lessons/arbaoonBook.jpg"
                  className="mb-3 mx-auto"
                  alt="شرح الأربعون النووية"
                  style={{ width: "100%", height: "350px", objectFit: "cover", borderRadius: "8px" }}
                />
                <h5 className="mb-2">📘 شرح الأربعون النووية</h5>
                <p className="text-secondary mt-auto">
                  تدبر وشرح كتاب الأربعون النووية للإمام النووي
                </p>
              </div>
            </div>

            {/* Book 2 */}
            <div className="col-md-4 d-flex">
              <div className="bg-black p-3 rounded shadow text-center w-100 d-flex flex-column">
                <img
                  src="https://cvtlkqqnoqcwvzvlazyz.supabase.co/storage/v1/object/public/courses-bucket/lessons/kahf.jpg"
                  className="mb-3 mx-auto"
                  alt="أنوار الكهف"
                  style={{ width: "100%", height: "350px", objectFit: "cover", borderRadius: "8px" }}
                />
                <h5 className="mb-2">📘 أنوار الكهــف</h5>
                <p className="text-secondary mt-auto">
                  تدبر سورة الكهف
                </p>
              </div>
            </div>

            {/* Book 3 */}
            <div className="col-md-4 d-flex">
              <div className="bg-black p-3 rounded shadow text-center w-100 d-flex flex-column">
                <img
                  src="https://cvtlkqqnoqcwvzvlazyz.supabase.co/storage/v1/object/public/courses-bucket/lessons/tazkia.jpg"
                  className="mb-3 mx-auto"
                  alt="خريطة التزكية"
                  style={{ width: "100%", height: "350px", objectFit: "cover", borderRadius: "8px" }}
                />
                <h5 className="mb-2">📘 خريطة التزكية</h5>
                <p className="text-secondary mt-auto">
                  خطتك العملية للتغير في شهرين
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
