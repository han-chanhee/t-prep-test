//src/GenerateMaterialPage.js
import React from "react";

function GenerateMaterialPage({
  selectedKeyword,
  recommendedMaterials,
  otherMaterialButtons,
  onMaterialAdded,
  onContinue,
  onGoToStorytelling, // 추가
}) {
  return (
    <div>
      <h2>수업 자료 생성: {selectedKeyword}</h2>
      <h3>스토리텔링 만들러 가기</h3>
      <button
        style={{
          margin: "5px",
          padding: "8px 12px",
          backgroundColor: "#ff9800",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={onGoToStorytelling}
      >
        Go
      </button>

      <h3>추천 수업 자료</h3>
      <div
        style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          paddingBottom: "10px",
        }}
      >
        {recommendedMaterials.map((material, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              minWidth: "200px",
            }}
          >
            {material}
            <button
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                backgroundColor: "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => onMaterialAdded(selectedKeyword, material)}
            >
              추가
            </button>
          </div>
        ))}
      </div>

      <h3>기타 수업 자료 생성</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {otherMaterialButtons.map((buttonLabel, index) => (
          <button
            key={index}
            style={{
              padding: "10px 15px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              border: "1px solid #ccc",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => {
              const generated = `[생성됨] ${selectedKeyword} - ${buttonLabel}`;
              onMaterialAdded(selectedKeyword, generated);
              alert(
                `${buttonLabel} 수업 자료가 생성되어 목록에 추가되었습니다.`
              );
            }}
          >
            {buttonLabel} 생성
          </button>
        ))}
      </div>

      <button
        style={{
          margin: "5px",
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={onContinue}
      >
        최종 추가하고 계속 수업 자료 만들러 가기
      </button>
    </div>
  );
}

export default GenerateMaterialPage;
