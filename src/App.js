import React, { useState } from "react";
import StartPage from "./StartPage";
import NextPage from "./NextPage";
import GenerateMaterialPage from "./GenerateMaterialPage";
import StorytellingPage from "./StorytellingPage";
import CreateSurvey from "./CreateSurvey"; // 설문 생성 페이지 컴포넌트 추가

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

  const handleGoToStorytelling = () => {
    setCurrentPage("storytelling");
  };

  const handleBackToGenerate = () => {
    setCurrentPage("generate");
  };

  // ★ 질문 만들기 버튼 클릭 시 호출될 핸들러
  const handleGoToCreateSurvey = () => {
    setCurrentPage("createSurvey");
  };

  if (currentPage === "start") {
    return <StartPage onNext={handleNextPage} />;
  } else if (currentPage === "next" && unitInfo) {
    return (
      <NextPage
        unitInfo={unitInfo}
        onGenerate={handleGoToGenerate}
        addedMaterials={addedMaterials}
        onGoToCreateSurvey={handleGoToCreateSurvey} // ★ prop 전달
      />
    );
  } else if (currentPage === "generate" && selectedKeywordForGeneration) {
    const recommended = ["추천 자료 1", "추천 자료 2", "추천 자료 3"];
    const others = ["퀴즈", "설명", "토론", "실습"];
    return (
      <GenerateMaterialPage
        selectedKeyword={selectedKeywordForGeneration}
        recommendedMaterials={recommended}
        otherMaterialButtons={others}
        onMaterialAdded={handleMaterialAdded}
        onContinue={handleContinueGenerating}
        onGoToStorytelling={handleGoToStorytelling}
      />
    );
  } else if (currentPage === "storytelling") {
    return (
      <StorytellingPage
        selectedKeyword={selectedKeywordForGeneration}
        addedMaterials={addedMaterials}
        onMaterialAdded={handleMaterialAdded}
        onBack={handleBackToGenerate}
      />
    );
  } else if (currentPage === "createSurvey") {
    return <CreateSurvey onBack={() => setCurrentPage("next")} />;
  }

  return <div>알 수 없는 페이지입니다.</div>;
}

export default App;
