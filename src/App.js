// src/App.js
import React, { useState } from "react";
import StartPage from "./StartPage";
import NextPage from "./NextPage";
import GenerateMaterialPage from "./GenerateMaterialPage";

function App() {
  const [currentPage, setCurrentPage] = useState("start");
  const [unitInfo, setUnitInfo] = useState(null);
  const [selectedKeywordForGeneration, setSelectedKeywordForGeneration] =
    useState(null);
  const [addedMaterials, setAddedMaterials] = useState([]);

  const handleNextPage = (data) => {
    setUnitInfo(data);
    setCurrentPage("next");
  };

  const handleGoToGenerate = (keyword) => {
    setSelectedKeywordForGeneration(keyword);
    setCurrentPage("generate");
  };

  const handleMaterialAdded = (keyword, material) => {
    setAddedMaterials([...addedMaterials, { keyword, material }]);
    alert(`'${keyword}'에 대한 수업 자료가 추가되었습니다.`);
  };

  const handleContinueGenerating = () => {
    setCurrentPage("next");
    setSelectedKeywordForGeneration(null);
  };

  if (currentPage === "start") {
    return <StartPage onNext={handleNextPage} />;
  } else if (currentPage === "next" && unitInfo) {
    return (
      <NextPage
        unitInfo={unitInfo}
        onGenerate={handleGoToGenerate}
        addedMaterials={addedMaterials}
      />
    );
  } else if (currentPage === "generate" && selectedKeywordForGeneration) {
    // 임시 데이터
    const recommended = ["추천 자료 1", "추천 자료 2", "추천 자료 3"];
    const others = ["퀴즈", "설명", "토론", "실습"];
    return (
      <GenerateMaterialPage
        selectedKeyword={selectedKeywordForGeneration}
        recommendedMaterials={recommended}
        otherMaterialButtons={others}
        onMaterialAdded={handleMaterialAdded}
        onContinue={handleContinueGenerating}
      />
    );
  }

  return <div>알 수 없는 페이지입니다.</div>;
}

export default App;
