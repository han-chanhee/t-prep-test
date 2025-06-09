import React, { useState } from "react";

function StorytellingPage({
  selectedKeyword,
  addedMaterials,
  onMaterialAdded,
  onBack,
}) {
  const [step, setStep] = useState("selectCharacter");
  const [characters, setCharacters] = useState([
    {
      name: "인물 A",
      image: "",
      description: "모험심이 강한 탐험가, 새로운 도전을 사랑함.",
    },
    {
      name: "인물 B",
      image: "",
      description: "지혜로운 학자, 지식 공유를 즐김.",
    },
    {
      name: "인물 C",
      image: "",
      description: "용감한 전사, 정의를 위해 싸움.",
    },
    {
      name: "인물 D",
      image: "",
      description: "창의적인 예술가, 이야기를 그림으로 표현.",
    },
  ]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [script, setScript] = useState({
    background: "",
    development: "",
    event: "",
    conclusion: "",
  });
  const [imagePrompts, setImagePrompts] = useState({
    background: "",
    development: "",
    event: "",
    conclusion: "",
  });
  const [imageUrls, setImageUrls] = useState({
    background: "",
    development: "",
    event: "",
    conclusion: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
    setIsLoading(true);
    setTimeout(() => {
      setScript({
        background: `${character.name}가 ${selectedKeyword}와 관련된 마을에서 모험을 시작했다.`,
        development: `${character.name}는 새로운 친구를 만나 ${selectedKeyword}에 대해 배웠다.`,
        event: `갑작스럽게 ${selectedKeyword}와 관련된 큰 사건이 발생했다!`,
        conclusion: `${character.name}는 문제를 해결하고 ${selectedKeyword}의 가치를 깨달았다.`,
      });
      setImagePrompts({
        background: `Illustration of ${character.name} in a ${selectedKeyword} village, vibrant and adventurous`,
        development: `Illustration of ${character.name} meeting a friend in a ${selectedKeyword} setting`,
        event: `Illustration of a dramatic ${selectedKeyword} event involving ${character.name}`,
        conclusion: `Illustration of ${character.name} resolving the ${selectedKeyword} story`,
      });
      setStep("editScript");
      setIsLoading(false);
    }, 1000);
  };

  const handleGenerateImage = (section) => {
    setIsLoading(true);
    setTimeout(() => {
      setImageUrls((prev) => ({
        ...prev,
        [section]: `https://source.unsplash.com/random/800x600/?${section}`,
      }));
      setIsLoading(false);
      if (
        Object.values({ ...imageUrls, [section]: true }).every((url) => url)
      ) {
        setStep("review");
      }
    }, 1000);
  };

  const handleGenerateAllImages = () => {
    setIsLoading(true);
    setTimeout(() => {
      setImageUrls({
        background: `https://source.unsplash.com/random/800x600/?background`,
        development: `https://source.unsplash.com/random/800x600/?development`,
        event: `https://source.unsplash.com/random/800x600/?event`,
        conclusion: `https://source.unsplash.com/random/800x600/?conclusion`,
      });
      setStep("review");
      setIsLoading(false);
    }, 1000);
  };

  const handleScriptChange = (field, value) => {
    setScript((prev) => ({ ...prev, [field]: value }));
  };

  const handlePromptChange = (field, value) => {
    setImagePrompts((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveStory = () => {
    const storyContent = {
      keyword: selectedKeyword,
      material: JSON.stringify({
        character: selectedCharacter,
        script,
        imageUrls,
      }),
    };
    onMaterialAdded(selectedKeyword, storyContent.material);
    onBack();
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "64rem", margin: "0 auto" }}>
      <h1
        style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}
      >
        스토리텔링 생성: {selectedKeyword}
      </h1>

      {isLoading && (
        <div style={{ textAlign: "center", color: "#6b7280" }}>로딩 중...</div>
      )}
      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}

      {step === "selectCharacter" && (
        <div>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            추천 인물 선택
          </h2>
          {characters.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {characters.map((character) => (
                <div
                  key={character.name}
                  style={{
                    position: "relative",
                    cursor: "pointer",
                    borderRadius: "0.5rem",
                  }}
                  onClick={() => handleSelectCharacter(character)}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "12rem",
                      backgroundColor: "#d1d5db",
                      borderRadius: "0.5rem",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {character.image ? (
                      <img
                        src={character.image}
                        alt={character.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "0.5rem",
                        }}
                      />
                    ) : (
                      <span style={{ color: "#6b7280" }}>이미지 없음</span>
                    )}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "white",
                      opacity: 0,
                      borderRadius: "0.5rem",
                      transition: "opacity 0.3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                  >
                    <p
                      style={{
                        fontSize: "0.875rem",
                        textAlign: "center",
                        padding: "0.5rem",
                      }}
                    >
                      {character.description}
                    </p>
                  </div>
                  <p
                    style={{
                      textAlign: "center",
                      marginTop: "0.5rem",
                      fontWeight: "500",
                    }}
                  >
                    {character.name}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "#6b7280" }}>추천 인물이 없습니다.</p>
          )}
        </div>
      )}

      {step === "editScript" && (
        <div>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            스크립트 수정
          </h2>
          {["background", "development", "event", "conclusion"].map((field) => (
            <div key={field} style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "500",
                  marginBottom: "0.25rem",
                }}
              >
                {field === "background" && "배경"}
                {field === "development" && "전개"}
                {field === "event" && "사건"}
                {field === "conclusion" && "결말"}
              </label>
              <textarea
                value={script[field]}
                onChange={(e) => handleScriptChange(field, e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  outline: "none",
                  resize: "vertical",
                  fontSize: "0.875rem",
                }}
                rows="4"
                placeholder={`${field} 입력...`}
              />
            </div>
          ))}
          <button
            onClick={() => setStep("generateImage")}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#3b82f6",
              color: "white",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            삽화 생성으로 이동
          </button>
        </div>
      )}

      {/* 단계 3: 삽화 생성 및 프롬프트 수정 */}
      {step === "generateImage" && (
        <div>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            삽화 생성
          </h2>
          {["background", "development", "event", "conclusion"].map(
            (section) => (
              <div key={section} style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ fontWeight: "500", marginBottom: "0.25rem" }}>
                  {section === "background" && "배경"}
                  {section === "development" && "전개"}
                  {section === "event" && "사건"}
                  {section === "conclusion" && "결말"} 삽화
                </h3>
                <textarea
                  value={imagePrompts[section]}
                  onChange={(e) => handlePromptChange(section, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  rows="3"
                  placeholder={`${section} 삽화 프롬프트 입력...`}
                />
                <button
                  style={{
                    marginTop: "0.5rem",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#22c55e",
                    color: "#fff",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                    border: "none",
                  }}
                  onClick={() => handleGenerateImage(section)}
                >
                  {section === "background" && "배경"}
                  {section === "development" && "전개"}
                  {section === "event" && "사건"}
                  {section === "conclusion" && "결말"} 삽화 생성
                </button>
                {imageUrls[section] && (
                  <img
                    src={imageUrls[section]}
                    alt={`${section} Illustration`}
                    style={{
                      marginTop: "0.5rem",
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: "0.5rem",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                )}
              </div>
            )
          )}
          <button
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#3b82f6",
              color: "#fff",
              borderRadius: "0.5rem",
              cursor: "pointer",
              border: "none",
            }}
            onClick={handleGenerateAllImages}
          >
            모든 삽화 생성 및 확인
          </button>
        </div>
      )}

      {/* 단계 4: 최종 확인 */}
      {step === "review" && (
        <div>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            최종 스토리텔링 확인
          </h2>
          <div style={{ marginBottom: "1rem" }}>
            <h3 style={{ fontWeight: "500" }}>스크립트</h3>
            <div
              style={{
                border: "1px solid #d1d5db",
                padding: "1rem",
                borderRadius: "0.5rem",
                backgroundColor: "#f9fafb",
              }}
            >
              <p>
                <strong>배경:</strong> {script.background}
              </p>
              <p>
                <strong>전개:</strong> {script.development}
              </p>
              <p>
                <strong>사건:</strong> {script.event}
              </p>
              <p>
                <strong>결말:</strong> {script.conclusion}
              </p>
            </div>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <h3 style={{ fontWeight: "500" }}>삽화</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "1rem",
              }}
            >
              {["background", "development", "event", "conclusion"].map(
                (section) => (
                  <div key={section}>
                    <p style={{ fontWeight: "500" }}>
                      {section === "background" && "배경"}
                      {section === "development" && "전개"}
                      {section === "event" && "사건"}
                      {section === "conclusion" && "결말"}
                    </p>
                    {imageUrls[section] ? (
                      <img
                        src={imageUrls[section]}
                        alt={`${section} Illustration`}
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          borderRadius: "0.5rem",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    ) : (
                      <p style={{ color: "#6b7280" }}>
                        삽화가 생성되지 않았습니다.
                      </p>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#6b7280",
                color: "#fff",
                borderRadius: "0.5rem",
                cursor: "pointer",
                border: "none",
              }}
              onClick={() => setStep("generateImage")}
            >
              삽화 다시 생성
            </button>
            <button
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#3b82f6",
                color: "#fff",
                borderRadius: "0.5rem",
                cursor: "pointer",
                border: "none",
              }}
              onClick={() => setStep("editScript")}
            >
              스크립트 수정
            </button>
            <button
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#22c55e",
                color: "#fff",
                borderRadius: "0.5rem",
                cursor: "pointer",
                border: "none",
              }}
              onClick={handleSaveStory}
            >
              저장 및 자료 생성 페이지로 이동
            </button>
          </div>
        </div>
      )}

      {/* 뒤로 가기 버튼 */}
      <button
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#6b7280",
          color: "#fff",
          borderRadius: "0.5rem",
          cursor: "pointer",
          border: "none",
        }}
        onClick={onBack}
      >
        자료 생성 페이지로 돌아가기
      </button>
    </div>
  );
}

export default StorytellingPage;
