import React, { useState } from "react";
import initialTeams from "../data/teams.json";
import initialGroups from "../data/groups.json";
import * as htmlToImage from "html-to-image";

export default function TournamentBrackets() {
  const [teams, setTeams] = useState(initialTeams);
  const [groups] = useState(initialGroups);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [quarterFinal, setQuarterFinal] = useState([]);
  const [semiFinal, setSemiFinal] = useState([]);
  const [final, setFinal] = useState([]);
  const [winner, setWinner] = useState({});

  const handleClick = (team) => {
    if (selectedTeams.findIndex((i) => i.id === team.id) !== -1) return;
    const groupMember = selectedTeams.filter((i) => i.group === team.group);

    if (groupMember.length === 0) {
      team.rank += 1;
      setSelectedTeams([...selectedTeams, team]);
    } else if (groupMember.length === 1) {
      team.rank = groupMember[0].rank + 1;
      setSelectedTeams([...selectedTeams, team]);
    } else {
      const teamsClone = teams;
      const highestRank = calculateHighestRankByGroup(team.group);
      const index = teamsClone.findIndex((i) => i.name === team.name);
      teamsClone[index].rank = highestRank + 1;
      setTeams([...teamsClone]);
    }
  };

  const calculateHighestRankByGroup = (group) => {
    const filteredGroup = teams.filter((i) => i.group === group);
    return Math.max(...filteredGroup.map((i) => i.rank));
  };

  const setQuarterFinalTeams = (team, side) => {
    if (quarterFinal.findIndex((i) => i.id === team.id) !== -1) return;
    if (selectedTeams.length < 16)
      return alert("En az 16 takım seçmeniz gerekiyor.");

    const filteredTeams = quarterFinal.filter((i) => i.side === side);
    if (filteredTeams.length === 0) {
      team.side = side;
      setQuarterFinal([...quarterFinal, team]);
    }
  };

  const setSemiFinalTeams = (team, side) => {
    if (semiFinal.findIndex((i) => i.id === team.id) !== -1) return;
    if (quarterFinal.length < 8)
      return alert("En az 8 takım seçmeniz gerekiyor.");
    const filteredTeams = semiFinal.filter((i) => i.semiSide === side);
    if (filteredTeams.length === 0) {
      team.semiSide = side;
      setSemiFinal([...semiFinal, team]);
    }
  };

  const setFinalTeams = (team, side) => {
    if (final.findIndex((i) => i.id === team.id) !== -1) return;
    if (semiFinal.length < 4) return alert("En az 4 takım seçmeniz gerekiyor.");
    const filteredTeams = final.filter((i) => i.finalSide === side);
    if (filteredTeams.length === 0) {
      team.finalSide = side;
      setFinal([...final, team]);
    }
  };

  const setWinnerTeam = (team) => {
    if (final.length < 2) return alert("En az 2 takım seçmeniz gerekiyor.");
    setWinner(team);
  };

  const downloadImage = () => {
    htmlToImage
      .toJpeg(document.getElementById('hero'), { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "yuzdeyuzsampiyon.jpeg";
        link.href = dataUrl;
        link.click();
      });
  };

  return (
    <>
      {winner.name && (
        <div className="absolute bottom-32 flex w-full justify-around font-bold">
          <button
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?text=2022 Dünya Kupası için tahminimi yaptım. Benim şampiyonum: ${winner.name}&hashtags=yüzdeyüzşampiyon`,
                "_blank"
              )
            }
            className=" bg-[#1C99E6] rounded-md w-40 h-10 text-white"
          >
            Twitter'da Paylaş
          </button>

          <button
            type="button"
            className=" bg-black text-white rounded-md w-40 h-10"
            onClick={() => downloadImage()}
          >
            Görseli İndir
          </button>
        </div>
      )}

      <div
        className="bg-hero-pattern h-screen overflow-auto bg-cover bg-bottom sm:bg-center   md:pt-2 md:p-10  text-xs lg:text-base"
        id="hero"
      >
        <div className="lg:mx-8 mx-1 pt-8 md:pt-20 pb-20 md:pb-40">
          <div className="md:grid md:grid-cols-12 flex w-full h-3/4 ">
            <div className="md:col-span-2 space-y-10">
              {groups.map((group, index) => {
                if (group.side === "right") return false;
                return (
                  <div
                    key={index}
                    className="border-2 group-box overflow-hidden flex flex-col w-28 md:w-full md:col-span-1 shadow-md border-black text-center text-xs lg:text-base"
                  >
                    <div key={index} className="bg-black text-white">
                      {group.name} GRUBU
                    </div>

                    {teams.map((team) => {
                      /*eslint-disable-next-line*/
                      if (team.group !== group.name) return;
                      return (
                        <button
                          key={team.id}
                          disabled={team.rank !== 0}
                          onClick={() => handleClick(team)}
                          className={`flex w-full items-center pt-1 cursor-pointer  text-[8px] lg:text-base lg:flex justify-between px-4 
                        ${team.rank === 0 && "bg-transparent hover:opacity-70"}
                        ${(team.rank === 1 || team.rank === 2) && "bg-green-500"
                            }
                        ${(team.rank === 3 || team.rank === 4) && "bg-red-500"
                            } `}
                        >
                          <div className="flex w-4 h-5 lg:w-6 lg:h-6 justify-center items-center">
                            <img
                              src={`../assets/flags/${team.flag}`}
                              alt={team.name}
                              className="h-full py-1 w-full"
                            />
                          </div>
                          {team.name}
                          <div className="text-[10px] md:text-sm">
                            {team.rank !== 0 && "#" + team.rank}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className="md:col-span-1 ml-2 lg:ml-0">
              <div className="flex flex-col space-y-11 h-full lg:justify-around lg:h-full relative text-center lg:ml-2">
                <div className=" h-[112px]   flex flex-col justify-center items-center ">
                  {selectedTeams.filter((i) => i.group === "A" && i.rank === 1)
                    .length === 0 ? (
                    <div className="hexagon">
                      <span className="relative flex items-center justify-center w-full h-full">
                        A1
                      </span>{" "}
                    </div>
                  ) : (
                    <div className="hexagon">
                      {selectedTeams
                        .filter((i) => i.group === "A" && i.rank === 1)
                        .map((team, index) => (
                          <div
                            key={index}
                            onClick={() => setQuarterFinalTeams(team, 1)}
                            disabled={quarterFinal.some(
                              (i) =>
                                (i.group === "A" && i.rank === 1) ||
                                (i.group === "B" && i.rank === 2)
                            )}
                            className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!quarterFinal.some(
                              (i) =>
                                (i.group === "A" && i.rank === 1) ||
                                (i.group === "B" && i.rank === 2)
                            ) && "bg-transparent hover:opacity-70"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "A" && i.rank === 1) ||
                                  (i.group === "B" && i.rank === 2)
                              ) &&
                              quarterFinal.some((i) => i.name === team.name) &&
                              "bg-green-500"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "A" && i.rank === 1) ||
                                  (i.group === "B" && i.rank === 2)
                              ) &&
                              !quarterFinal.some((i) => i.name === team.name) &&
                              "bg-red-500"
                              }
                          `}
                          >
                            {team.name}
                          </div>
                        ))}
                    </div>
                  )}

                  <div className="opacity-25">vs</div>

                  {selectedTeams.filter((i) => i.group === "B" && i.rank === 2)
                    .length === 0 ? (
                    <div className="hexagon">
                      <span className="relative flex items-center justify-center w-full h-full">
                        B2
                      </span>{" "}
                    </div>
                  ) : (
                    <div className="hexagon">
                      {selectedTeams
                        .filter((i) => i.group === "B" && i.rank === 2)
                        .map((team, index) => (
                          <div
                            key={index}
                            onClick={() => setQuarterFinalTeams(team, 1)}
                            disabled={quarterFinal.some(
                              (i) =>
                                (i.group === "A" && i.rank === 1) ||
                                (i.group === "B" && i.rank === 2)
                            )}
                            className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!quarterFinal.some(
                              (i) =>
                                (i.group === "A" && i.rank === 1) ||
                                (i.group === "B" && i.rank === 2)
                            ) && "bg-transparent hover:opacity-70"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "A" && i.rank === 1) ||
                                  (i.group === "B" && i.rank === 2)
                              ) &&
                              quarterFinal.some((i) => i.name === team.name) &&
                              "bg-green-500"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "A" && i.rank === 1) ||
                                  (i.group === "B" && i.rank === 2)
                              ) &&
                              !quarterFinal.some((i) => i.name === team.name) &&
                              "bg-red-500"
                              }
                          `}
                          >
                            {team.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className=" h-[112px]  flex flex-col justify-center items-center ">
                  {selectedTeams.filter((i) => i.group === "C" && i.rank === 1)
                    .length === 0 ? (
                    <div className="hexagon">
                      <span className="relative flex items-center justify-center w-full h-full">
                        C1
                      </span>{" "}
                    </div>
                  ) : (
                    <div className="hexagon">
                      {selectedTeams
                        .filter((i) => i.group === "C" && i.rank === 1)
                        .map((team, index) => (
                          <div
                            key={index}
                            onClick={() => setQuarterFinalTeams(team, 2)}
                            disabled={quarterFinal.some(
                              (i) =>
                                (i.group === "C" && i.rank === 1) ||
                                (i.group === "D" && i.rank === 2)
                            )}
                            className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!quarterFinal.some(
                              (i) =>
                                (i.group === "C" && i.rank === 1) ||
                                (i.group === "D" && i.rank === 2)
                            ) && "bg-transparent hover:opacity-70"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "C" && i.rank === 1) ||
                                  (i.group === "D" && i.rank === 2)
                              ) &&
                              quarterFinal.some((i) => i.name === team.name) &&
                              "bg-green-500"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "C" && i.rank === 1) ||
                                  (i.group === "D" && i.rank === 2)
                              ) &&
                              !quarterFinal.some((i) => i.name === team.name) &&
                              "bg-red-500"
                              }
                          `}
                          >
                            {team.name}
                          </div>
                        ))}
                    </div>
                  )}
                  <div className="opacity-25">vs</div>
                  {selectedTeams.filter((i) => i.group === "D" && i.rank === 2)
                    .length === 0 ? (
                    <div className="hexagon">
                      <span className="relative flex items-center justify-center w-full h-full">
                        D2
                      </span>{" "}
                    </div>
                  ) : (
                    <div className="hexagon">
                      {selectedTeams
                        .filter((i) => i.group === "D" && i.rank === 2)
                        .map((team, index) => (
                          <div
                            key={index}
                            onClick={() => setQuarterFinalTeams(team, 2)}
                            disabled={quarterFinal.some(
                              (i) =>
                                (i.group === "C" && i.rank === 1) ||
                                (i.group === "D" && i.rank === 2)
                            )}
                            className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!quarterFinal.some(
                              (i) =>
                                (i.group === "C" && i.rank === 1) ||
                                (i.group === "D" && i.rank === 2)
                            ) && "bg-transparent hover:opacity-70"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "C" && i.rank === 1) ||
                                  (i.group === "D" && i.rank === 2)
                              ) &&
                              quarterFinal.some((i) => i.name === team.name) &&
                              "bg-green-500"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "C" && i.rank === 1) ||
                                  (i.group === "D" && i.rank === 2)
                              ) &&
                              !quarterFinal.some((i) => i.name === team.name) &&
                              "bg-red-500"
                              }
                          `}
                          >
                            {team.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className=" h-[112px]  flex flex-col justify-center items-center ">
                  {selectedTeams.filter((i) => i.group === "E" && i.rank === 1)
                    .length === 0 ? (
                    <div className="hexagon">
                      <span className="relative flex items-center justify-center w-full h-full">
                        E1
                      </span>{" "}
                    </div>
                  ) : (
                    <div className="hexagon">
                      {selectedTeams
                        .filter((i) => i.group === "E" && i.rank === 1)
                        .map((team, index) => (
                          <div
                            key={index}
                            onClick={() => setQuarterFinalTeams(team, 3)}
                            disabled={quarterFinal.some(
                              (i) =>
                                (i.group === "E" && i.rank === 1) ||
                                (i.group === "F" && i.rank === 2)
                            )}
                            className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!quarterFinal.some(
                              (i) =>
                                (i.group === "E" && i.rank === 1) ||
                                (i.group === "F" && i.rank === 2)
                            ) && "bg-transparent hover:opacity-70"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "E" && i.rank === 1) ||
                                  (i.group === "F" && i.rank === 2)
                              ) &&
                              quarterFinal.some((i) => i.name === team.name) &&
                              "bg-green-500"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "E" && i.rank === 1) ||
                                  (i.group === "F" && i.rank === 2)
                              ) &&
                              !quarterFinal.some((i) => i.name === team.name) &&
                              "bg-red-500"
                              }
                          `}
                          >
                            {team.name}
                          </div>
                        ))}
                    </div>
                  )}
                  <div className="opacity-25">vs</div>
                  {selectedTeams.filter((i) => i.group === "F" && i.rank === 2)
                    .length === 0 ? (
                    <div className="hexagon">
                      <span className="relative flex items-center justify-center w-full h-full">
                        F2
                      </span>{" "}
                    </div>
                  ) : (
                    <div className="hexagon">
                      {selectedTeams
                        .filter((i) => i.group === "F" && i.rank === 2)
                        .map((team, index) => (
                          <div
                            key={index}
                            onClick={() => setQuarterFinalTeams(team, 3)}
                            disabled={quarterFinal.some(
                              (i) =>
                                (i.group === "E" && i.rank === 1) ||
                                (i.group === "F" && i.rank === 2)
                            )}
                            className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!quarterFinal.some(
                              (i) =>
                                (i.group === "E" && i.rank === 1) ||
                                (i.group === "F" && i.rank === 2)
                            ) && "bg-transparent hover:opacity-70"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "E" && i.rank === 1) ||
                                  (i.group === "F" && i.rank === 2)
                              ) &&
                              quarterFinal.some((i) => i.name === team.name) &&
                              "bg-green-500"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "E" && i.rank === 1) ||
                                  (i.group === "F" && i.rank === 2)
                              ) &&
                              !quarterFinal.some((i) => i.name === team.name) &&
                              "bg-red-500"
                              }
                          `}
                          >
                            {team.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className=" h-[112px]  flex flex-col justify-center items-center ">
                  {selectedTeams.filter((i) => i.group === "G" && i.rank === 1)
                    .length === 0 ? (
                    <div className="hexagon">
                      <span className="relative flex items-center justify-center w-full h-full">
                        G1
                      </span>{" "}
                    </div>
                  ) : (
                    <div className="hexagon">
                      {selectedTeams
                        .filter((i) => i.group === "G" && i.rank === 1)
                        .map((team, index) => (
                          <div
                            key={index}
                            onClick={() => setQuarterFinalTeams(team, 4)}
                            disabled={quarterFinal.some(
                              (i) =>
                                (i.group === "G" && i.rank === 1) ||
                                (i.group === "H" && i.rank === 2)
                            )}
                            className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!quarterFinal.some(
                              (i) =>
                                (i.group === "G" && i.rank === 1) ||
                                (i.group === "H" && i.rank === 2)
                            ) && "bg-transparent hover:opacity-70"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "G" && i.rank === 1) ||
                                  (i.group === "H" && i.rank === 2)
                              ) &&
                              quarterFinal.some((i) => i.name === team.name) &&
                              "bg-green-500"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "G" && i.rank === 1) ||
                                  (i.group === "H" && i.rank === 2)
                              ) &&
                              !quarterFinal.some((i) => i.name === team.name) &&
                              "bg-red-500"
                              }
                          `}
                          >
                            {team.name}
                          </div>
                        ))}
                    </div>
                  )}
                  <div className="opacity-25">vs</div>
                  {selectedTeams.filter((i) => i.group === "H" && i.rank === 2)
                    .length === 0 ? (
                    <div className="hexagon">
                      <span className="relative flex items-center justify-center w-full h-full">
                        H2
                      </span>{" "}
                    </div>
                  ) : (
                    <div className="hexagon">
                      {selectedTeams
                        .filter((i) => i.group === "H" && i.rank === 2)
                        .map((team, index) => (
                          <div
                            key={index}
                            onClick={() => setQuarterFinalTeams(team, 4)}
                            disabled={quarterFinal.some(
                              (i) =>
                                (i.group === "G" && i.rank === 1) ||
                                (i.group === "H" && i.rank === 2)
                            )}
                            className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!quarterFinal.some(
                              (i) =>
                                (i.group === "G" && i.rank === 1) ||
                                (i.group === "H" && i.rank === 2)
                            ) && "bg-transparent hover:opacity-70"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "G" && i.rank === 1) ||
                                  (i.group === "H" && i.rank === 2)
                              ) &&
                              quarterFinal.some((i) => i.name === team.name) &&
                              "bg-green-500"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "G" && i.rank === 1) ||
                                  (i.group === "H" && i.rank === 2)
                              ) &&
                              !quarterFinal.some((i) => i.name === team.name) &&
                              "bg-red-500"
                              }
                          `}
                          >
                            {team.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="md:col-span-1 text-center flex flex-col justify-around lg:ml-4">
              <div className=" group-box flex flex-col justify-between items-center py-1">
                <div className="hexagon">
                  {quarterFinal
                    .filter((i) => i.side === 1)
                    .map((team, index) => (
                      <div
                        key={index}
                        onClick={() => setSemiFinalTeams(team, 1)}
                        disabled={semiFinal.some(
                          (i) => i.side === 1 || i.side === 2
                        )}
                        className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!semiFinal.some(
                          (i) => i.side === 1 || i.side === 2
                        ) && "bg-transparent hover:opacity-70"
                          }
                          ${semiFinal.some(
                            (i) => i.side === 1 || i.side === 2
                          ) &&
                          semiFinal.some((i) => i.name === team.name) &&
                          "bg-green-500"
                          }
                          ${semiFinal.some(
                            (i) => i.side === 1 || i.side === 2
                          ) &&
                          !semiFinal.some((i) => i.name === team.name) &&
                          "bg-red-500"
                          }
                          `}
                      >
                        {team.name}
                      </div>
                    ))}
                </div>
                <div className="opacity-25">vs</div>
                <div className="hexagon">
                  {quarterFinal
                    .filter((i) => i.side === 2)
                    .map((team, index) => (
                      <div
                        key={index}
                        onClick={() => setSemiFinalTeams(team, 1)}
                        disabled={semiFinal.some(
                          (i) => i.side === 1 || i.side === 2
                        )}
                        className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!semiFinal.some(
                          (i) => i.side === 1 || i.side === 2
                        ) && "bg-transparent hover:opacity-70"
                          }
                          ${semiFinal.some(
                            (i) => i.side === 1 || i.side === 2
                          ) &&
                          semiFinal.some((i) => i.name === team.name) &&
                          "bg-green-500"
                          }
                          ${semiFinal.some(
                            (i) => i.side === 1 || i.side === 2
                          ) &&
                          !semiFinal.some((i) => i.name === team.name) &&
                          "bg-red-500"
                          }
                          `}
                      >
                        {team.name}
                      </div>
                    ))}
                </div>
              </div>

              <div className=" group-box flex flex-col justify-between items-center py-1 mt-5">
                <div className="hexagon">
                  {quarterFinal
                    .filter((i) => i.side === 3)
                    .map((team, index) => (
                      <div
                        key={index}
                        onClick={() => setSemiFinalTeams(team, 2)}
                        disabled={semiFinal.some(
                          (i) => i.side === 3 || i.side === 4
                        )}
                        className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!semiFinal.some(
                          (i) => i.side === 3 || i.side === 4
                        ) && "bg-transparent hover:opacity-70"
                          }
                          ${semiFinal.some(
                            (i) => i.side === 3 || i.side === 4
                          ) &&
                          semiFinal.some((i) => i.name === team.name) &&
                          "bg-green-500"
                          }
                          ${semiFinal.some(
                            (i) => i.side === 3 || i.side === 4
                          ) &&
                          !semiFinal.some((i) => i.name === team.name) &&
                          "bg-red-500"
                          }
                          `}
                      >
                        {team.name}
                      </div>
                    ))}
                </div>
                <div className="opacity-25">vs</div>
                <div className="hexagon">
                  {quarterFinal
                    .filter((i) => i.side === 4)
                    .map((team, index) => (
                      <div
                        key={index}
                        onClick={() => setSemiFinalTeams(team, 2)}
                        disabled={semiFinal.some(
                          (i) => i.side === 3 || i.side === 4
                        )}
                        className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!semiFinal.some(
                          (i) => i.side === 3 || i.side === 4
                        ) && "bg-transparent hover:opacity-70"
                          }
                          ${semiFinal.some(
                            (i) => i.side === 3 || i.side === 4
                          ) &&
                          semiFinal.some((i) => i.name === team.name) &&
                          "bg-green-500"
                          }
                          ${semiFinal.some(
                            (i) => i.side === 3 || i.side === 4
                          ) &&
                          !semiFinal.some((i) => i.name === team.name) &&
                          "bg-red-500"
                          }
                          `}
                      >
                        {team.name}
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="md:col-span-1 text-center flex flex-col justify-around ">
              <div className=" group-box flex flex-col justify-between items-center py-1  h-44">
                <div className="hexagon">
                  {semiFinal
                    .filter((i) => i.semiSide === 1)
                    .map((team, index) => (
                      <div
                        key={index}
                        disabled={final.some(
                          (i) => i.semiSide === 1 || i.semiSide === 2
                        )}
                        className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!final.some(
                          (i) => i.semiSide === 1 || i.semiSide === 2
                        ) && "bg-transparent hover:opacity-70"
                          }
                          ${final.some(
                            (i) => i.semiSide === 1 || i.semiSide === 2
                          ) &&
                          final.some((i) => i.name === team.name) &&
                          "bg-green-500"
                          }
                          ${final.some(
                            (i) => i.semiSide === 1 || i.semiSide === 2
                          ) &&
                          !final.some((i) => i.name === team.name) &&
                          "bg-red-500"
                          }
                          `}
                        onClick={() => setFinalTeams(team, 1)}
                      >
                        {team.name}
                      </div>
                    ))}
                </div>
                <div className="opacity-25">vs</div>
                <div className="hexagon">
                  {semiFinal
                    .filter((i) => i.semiSide === 2)
                    .map((team, index) => (
                      <div
                        key={index}
                        disabled={final.some(
                          (i) => i.semiSide === 1 || i.semiSide === 2
                        )}
                        className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!final.some(
                          (i) => i.semiSide === 1 || i.semiSide === 2
                        ) && "bg-transparent hover:opacity-70"
                          }
                          ${final.some(
                            (i) => i.semiSide === 1 || i.semiSide === 2
                          ) &&
                          final.some((i) => i.name === team.name) &&
                          "bg-green-500"
                          }
                          ${final.some(
                            (i) => i.semiSide === 1 || i.semiSide === 2
                          ) &&
                          !final.some((i) => i.name === team.name) &&
                          "bg-red-500"
                          }
                          `}
                        onClick={() => setFinalTeams(team, 1)}
                      >
                        {team.name}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-2 text-center flex items-center" id="heroMobile">
              <div className="flex flex-col w-full h-full md:justify-around justify-between">
                <div className="font-bold text-[14px] lg:text-[30px] lg:h-20">
                  TURNUVA AĞACI
                </div>
                <div className="flex  items-center gap-1 mx-auto h-80">
                  <div className="hexagon">
                    {final
                      .filter((i) => i.finalSide === 1)
                      .map((team, index) => (
                        <div
                          key={index}
                          disabled={
                            winner.finalSide === 1 || winner.finalSide === 2
                          }
                          className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                          ${!(
                              winner.finalSide === 1 || winner.finalSide === 2
                            ) && "bg-transparent hover:opacity-70"
                            }
                          ${(winner.finalSide === 1 ||
                              winner.finalSide === 2) &&
                            winner.name === team.name &&
                            "bg-green-500"
                            }
                          ${(winner.finalSide === 1 ||
                              winner.finalSide === 2) &&
                            winner.name !== team.name &&
                            "bg-red-500"
                            }`}
                          onClick={() => setWinnerTeam(team)}
                        >
                          {team.name}
                        </div>
                      ))}
                  </div>
                  <div className="opacity-25">vs</div>
                  <div className="hexagon">
                    {final
                      .filter((i) => i.finalSide === 2)
                      .map((team, index) => (
                        <div
                          key={index}
                          disabled={
                            winner.finalSide === 1 || winner.finalSide === 2
                          }
                          className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                          ${!(
                              winner.finalSide === 1 || winner.finalSide === 2
                            ) && "bg-transparent hover:opacity-70"
                            }
                          ${(winner.finalSide === 1 ||
                              winner.finalSide === 2) &&
                            winner.name === team.name &&
                            "bg-green-500"
                            }
                          ${(winner.finalSide === 1 ||
                              winner.finalSide === 2) &&
                            winner.name !== team.name &&
                            "bg-red-500"
                            }`}
                          onClick={() => setWinnerTeam(team)}
                        >
                          {team.name}
                        </div>
                      ))}
                  </div>
                </div>
                <div className=" text-[14px] lg:text-lg lg:h-20">
                  {winner.name ? (
                    <div className={`text-[14px] lg:text-lg text-center`}>
                      Şampiyon: {winner.name}
                    </div>
                  ) : (
                    <div className="h-8 md:h-12 "></div>
                  )}
                </div>
              </div>
            </div>

            <div className="md:col-span-1 text-center flex flex-col justify-around ">
              <div className=" group-box flex flex-col justify-between items-center py-1  h-44">
                <div className="hexagon">
                  {semiFinal
                    .filter((i) => i.semiSide === 3)
                    .map((team, index) => (
                      <div
                        key={index}
                        disabled={final.some(
                          (i) => i.semiSide === 3 || i.semiSide === 4
                        )}
                        className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!final.some(
                          (i) => i.semiSide === 3 || i.semiSide === 4
                        ) && "bg-transparent hover:opacity-70"
                          }
                          ${final.some(
                            (i) => i.semiSide === 3 || i.semiSide === 4
                          ) &&
                          final.some((i) => i.name === team.name) &&
                          "bg-green-500"
                          }
                          ${final.some(
                            (i) => i.semiSide === 3 || i.semiSide === 4
                          ) &&
                          !final.some((i) => i.name === team.name) &&
                          "bg-red-500"
                          }
                          `}
                        onClick={() => setFinalTeams(team, 2)}
                      >
                        {team.name}
                      </div>
                    ))}
                </div>
                <div className="opacity-25">vs</div>
                <div className="hexagon">
                  {semiFinal
                    .filter((i) => i.semiSide === 4)
                    .map((team, index) => (
                      <div
                        key={index}
                        disabled={final.some(
                          (i) => i.semiSide === 3 || i.semiSide === 4
                        )}
                        className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!final.some(
                          (i) => i.semiSide === 3 || i.semiSide === 4
                        ) && "bg-transparent hover:opacity-70"
                          }
                          ${final.some(
                            (i) => i.semiSide === 3 || i.semiSide === 4
                          ) &&
                          final.some((i) => i.name === team.name) &&
                          "bg-green-500"
                          }
                          ${final.some(
                            (i) => i.semiSide === 3 || i.semiSide === 4
                          ) &&
                          !final.some((i) => i.name === team.name) &&
                          "bg-red-500"
                          }
                          `}
                        onClick={() => setFinalTeams(team, 2)}
                      >
                        {team.name}
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="md:col-span-1 text-center flex flex-col justify-around lg:mr-4">
              <div className=" group-box flex flex-col justify-between items-center py-1">
                <div className="hexagon">
                  {quarterFinal
                    .filter((i) => i.side === 5)
                    .map((team, index) => (
                      <div
                        key={index}
                        onClick={() => setSemiFinalTeams(team, 3)}
                        disabled={semiFinal.some(
                          (i) => i.side === 5 || i.side === 6
                        )}
                        className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!semiFinal.some(
                          (i) => i.side === 5 || i.side === 6
                        ) && "bg-transparent hover:opacity-70"
                          }
                          ${semiFinal.some(
                            (i) => i.side === 5 || i.side === 6
                          ) &&
                          semiFinal.some((i) => i.name === team.name) &&
                          "bg-green-500"
                          }
                          ${semiFinal.some(
                            (i) => i.side === 5 || i.side === 6
                          ) &&
                          !semiFinal.some((i) => i.name === team.name) &&
                          "bg-red-500"
                          }
                          `}
                      >
                        {team.name}
                      </div>
                    ))}
                </div>
                <div className="opacity-25">vs</div>
                <div className="hexagon">
                  {quarterFinal
                    .filter((i) => i.side === 6)
                    .map((team, index) => (
                      <div
                        key={index}
                        onClick={() => setSemiFinalTeams(team, 3)}
                        disabled={semiFinal.some(
                          (i) => i.side === 5 || i.side === 6
                        )}
                        className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!semiFinal.some(
                          (i) => i.side === 5 || i.side === 6
                        ) && "bg-transparent hover:opacity-70"
                          }
                          ${semiFinal.some(
                            (i) => i.side === 5 || i.side === 6
                          ) &&
                          semiFinal.some((i) => i.name === team.name) &&
                          "bg-green-500"
                          }
                          ${semiFinal.some(
                            (i) => i.side === 5 || i.side === 6
                          ) &&
                          !semiFinal.some((i) => i.name === team.name) &&
                          "bg-red-500"
                          }
                          `}
                      >
                        {team.name}
                      </div>
                    ))}
                </div>
              </div>

              <div className=" group-box flex flex-col justify-between items-center py-1">
                <div className="hexagon">
                  {quarterFinal
                    .filter((i) => i.side === 7)
                    .map((team, index) => (
                      <div
                        key={index}
                        onClick={() => setSemiFinalTeams(team, 4)}
                        disabled={semiFinal.some(
                          (i) => i.side === 7 || i.side === 8
                        )}
                        className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!semiFinal.some(
                          (i) => i.side === 7 || i.side === 8
                        ) && "bg-transparent hover:opacity-70"
                          }
                          ${semiFinal.some(
                            (i) => i.side === 7 || i.side === 8
                          ) &&
                          semiFinal.some((i) => i.name === team.name) &&
                          "bg-green-500"
                          }
                          ${semiFinal.some(
                            (i) => i.side === 7 || i.side === 8
                          ) &&
                          !semiFinal.some((i) => i.name === team.name) &&
                          "bg-red-500"
                          }
                          `}
                      >
                        {team.name}
                      </div>
                    ))}
                </div>
                <div className="opacity-25">vs</div>
                <div className="hexagon">
                  {quarterFinal
                    .filter((i) => i.side === 8)
                    .map((team, index) => (
                      <div
                        key={index}
                        onClick={() => setSemiFinalTeams(team, 4)}
                        disabled={semiFinal.some(
                          (i) => i.side === 3 || i.side === 4
                        )}
                        className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!semiFinal.some(
                          (i) => i.side === 7 || i.side === 8
                        ) && "bg-transparent hover:opacity-70"
                          }
                          ${semiFinal.some(
                            (i) => i.side === 7 || i.side === 8
                          ) &&
                          semiFinal.some((i) => i.name === team.name) &&
                          "bg-green-500"
                          }
                          ${semiFinal.some(
                            (i) => i.side === 7 || i.side === 8
                          ) &&
                          !semiFinal.some((i) => i.name === team.name) &&
                          "bg-red-500"
                          }
                          `}
                      >
                        {team.name}
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="md:col-span-1 mr-2 lg:mr-0">
              <div className="flex flex-col space-y-11 h-full lg:justify-around lg:h-full relative text-center lg:mr-2">
                <div className=" h-[112px]   flex flex-col justify-center items-center ">
                  {selectedTeams.filter((i) => i.group === "B" && i.rank === 1)
                    .length === 0 ? (
                    <div className="hexagon">
                      <span className="relative flex items-center justify-center w-full h-full">
                        B1
                      </span>{" "}
                    </div>
                  ) : (
                    <div className="hexagon">
                      {selectedTeams
                        .filter((i) => i.group === "B" && i.rank === 1)
                        .map((team, index) => (
                          <div
                            key={index}
                            onClick={() => setQuarterFinalTeams(team, 5)}
                            disabled={quarterFinal.some(
                              (i) =>
                                (i.group === "B" && i.rank === 1) ||
                                (i.group === "A" && i.rank === 2)
                            )}
                            className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!quarterFinal.some(
                              (i) =>
                                (i.group === "B" && i.rank === 1) ||
                                (i.group === "A" && i.rank === 2)
                            ) && "bg-transparent hover:opacity-70"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "B" && i.rank === 1) ||
                                  (i.group === "A" && i.rank === 2)
                              ) &&
                              quarterFinal.some((i) => i.name === team.name) &&
                              "bg-green-500"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "B" && i.rank === 1) ||
                                  (i.group === "A" && i.rank === 2)
                              ) &&
                              !quarterFinal.some((i) => i.name === team.name) &&
                              "bg-red-500"
                              }
                          `}
                          >
                            {team.name}
                          </div>
                        ))}
                    </div>
                  )}
                  <div className="opacity-25">vs</div>
                  {selectedTeams.filter((i) => i.group === "A" && i.rank === 2)
                    .length === 0 ? (
                    <div className="hexagon">
                      <span className="relative flex items-center justify-center w-full h-full">
                        A2
                      </span>{" "}
                    </div>
                  ) : (
                    <div className="hexagon">
                      {selectedTeams
                        .filter((i) => i.group === "A" && i.rank === 2)
                        .map((team, index) => (
                          <div
                            key={index}
                            onClick={() => setQuarterFinalTeams(team, 5)}
                            disabled={quarterFinal.some(
                              (i) =>
                                (i.group === "B" && i.rank === 1) ||
                                (i.group === "A" && i.rank === 2)
                            )}
                            className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!quarterFinal.some(
                              (i) =>
                                (i.group === "B" && i.rank === 1) ||
                                (i.group === "A" && i.rank === 2)
                            ) && "bg-transparent hover:opacity-70"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "B" && i.rank === 1) ||
                                  (i.group === "A" && i.rank === 2)
                              ) &&
                              quarterFinal.some((i) => i.name === team.name) &&
                              "bg-green-500"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "B" && i.rank === 1) ||
                                  (i.group === "A" && i.rank === 2)
                              ) &&
                              !quarterFinal.some((i) => i.name === team.name) &&
                              "bg-red-500"
                              }
                          `}
                          >
                            {team.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className=" h-[112px]   flex flex-col justify-center items-center ">
                  {selectedTeams.filter((i) => i.group === "D" && i.rank === 1)
                    .length === 0 ? (
                    <div className="hexagon">
                      <span className="relative flex items-center justify-center w-full h-full">
                        D1
                      </span>{" "}
                    </div>
                  ) : (
                    <div className="hexagon">
                      {selectedTeams
                        .filter((i) => i.group === "D" && i.rank === 1)
                        .map((team, index) => (
                          <div
                            key={index}
                            onClick={() => setQuarterFinalTeams(team, 6)}
                            disabled={quarterFinal.some(
                              (i) =>
                                (i.group === "D" && i.rank === 1) ||
                                (i.group === "C" && i.rank === 2)
                            )}
                            className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!quarterFinal.some(
                              (i) =>
                                (i.group === "D" && i.rank === 1) ||
                                (i.group === "C" && i.rank === 2)
                            ) && "bg-transparent hover:opacity-70"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "D" && i.rank === 1) ||
                                  (i.group === "C" && i.rank === 2)
                              ) &&
                              quarterFinal.some((i) => i.name === team.name) &&
                              "bg-green-500"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "D" && i.rank === 1) ||
                                  (i.group === "C" && i.rank === 2)
                              ) &&
                              !quarterFinal.some((i) => i.name === team.name) &&
                              "bg-red-500"
                              }
                          `}
                          >
                            {team.name}
                          </div>
                        ))}
                    </div>
                  )}
                  <div className="opacity-25">vs</div>
                  {selectedTeams.filter((i) => i.group === "C" && i.rank === 2)
                    .length === 0 ? (
                    <div className="hexagon">
                      <span className="relative flex items-center justify-center w-full h-full">
                        C2
                      </span>{" "}
                    </div>
                  ) : (
                    <div className="hexagon">
                      {selectedTeams
                        .filter((i) => i.group === "C" && i.rank === 2)
                        .map((team, index) => (
                          <div
                            key={index}
                            onClick={() => setQuarterFinalTeams(team, 6)}
                            disabled={quarterFinal.some(
                              (i) =>
                                (i.group === "D" && i.rank === 1) ||
                                (i.group === "C" && i.rank === 2)
                            )}
                            className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!quarterFinal.some(
                              (i) =>
                                (i.group === "D" && i.rank === 1) ||
                                (i.group === "C" && i.rank === 2)
                            ) && "bg-transparent hover:opacity-70"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "D" && i.rank === 1) ||
                                  (i.group === "C" && i.rank === 2)
                              ) &&
                              quarterFinal.some((i) => i.name === team.name) &&
                              "bg-green-500"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "D" && i.rank === 1) ||
                                  (i.group === "C" && i.rank === 2)
                              ) &&
                              !quarterFinal.some((i) => i.name === team.name) &&
                              "bg-red-500"
                              }
                          `}
                          >
                            {team.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className=" h-[112px]   flex flex-col justify-center items-center ">
                  {selectedTeams.filter((i) => i.group === "F" && i.rank === 1)
                    .length === 0 ? (
                    <div className="hexagon">
                      <span className="relative flex items-center justify-center w-full h-full">
                        F1
                      </span>{" "}
                    </div>
                  ) : (
                    <div className="hexagon">
                      {selectedTeams
                        .filter((i) => i.group === "F" && i.rank === 1)
                        .map((team, index) => (
                          <div
                            key={index}
                            onClick={() => setQuarterFinalTeams(team, 7)}
                            disabled={quarterFinal.some(
                              (i) =>
                                (i.group === "F" && i.rank === 1) ||
                                (i.group === "E" && i.rank === 2)
                            )}
                            className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!quarterFinal.some(
                              (i) =>
                                (i.group === "F" && i.rank === 1) ||
                                (i.group === "E" && i.rank === 2)
                            ) && "bg-transparent hover:opacity-70"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "F" && i.rank === 1) ||
                                  (i.group === "E" && i.rank === 2)
                              ) &&
                              quarterFinal.some((i) => i.name === team.name) &&
                              "bg-green-500"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "F" && i.rank === 1) ||
                                  (i.group === "E" && i.rank === 2)
                              ) &&
                              !quarterFinal.some((i) => i.name === team.name) &&
                              "bg-red-500"
                              }
                          `}
                          >
                            {team.name}
                          </div>
                        ))}
                    </div>
                  )}
                  <div className="opacity-25">vs</div>
                  {selectedTeams.filter((i) => i.group === "E" && i.rank === 2)
                    .length === 0 ? (
                    <div className="hexagon">
                      <span className="relative flex items-center justify-center w-full h-full">
                        E2
                      </span>{" "}
                    </div>
                  ) : (
                    <div className="hexagon">
                      {selectedTeams
                        .filter((i) => i.group === "E" && i.rank === 2)
                        .map((team, index) => (
                          <div
                            key={index}
                            onClick={() => setQuarterFinalTeams(team, 7)}
                            disabled={quarterFinal.some(
                              (i) =>
                                (i.group === "F" && i.rank === 1) ||
                                (i.group === "E" && i.rank === 2)
                            )}
                            className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!quarterFinal.some(
                              (i) =>
                                (i.group === "F" && i.rank === 1) ||
                                (i.group === "E" && i.rank === 2)
                            ) && "bg-transparent hover:opacity-70"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "F" && i.rank === 1) ||
                                  (i.group === "E" && i.rank === 2)
                              ) &&
                              quarterFinal.some((i) => i.name === team.name) &&
                              "bg-green-500"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "F" && i.rank === 1) ||
                                  (i.group === "E" && i.rank === 2)
                              ) &&
                              !quarterFinal.some((i) => i.name === team.name) &&
                              "bg-red-500"
                              }
                          `}
                          >
                            {team.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className=" h-[112px]   flex flex-col justify-center items-center ">
                  {selectedTeams.filter((i) => i.group === "H" && i.rank === 1)
                    .length === 0 ? (
                    <div className="hexagon">
                      <span className="relative flex items-center justify-center w-full h-full">
                        H1
                      </span>{" "}
                    </div>
                  ) : (
                    <div className="hexagon">
                      {selectedTeams
                        .filter((i) => i.group === "H" && i.rank === 1)
                        .map((team, index) => (
                          <div
                            key={index}
                            onClick={() => setQuarterFinalTeams(team, 8)}
                            disabled={quarterFinal.some(
                              (i) =>
                                (i.group === "H" && i.rank === 1) ||
                                (i.group === "G" && i.rank === 2)
                            )}
                            className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!quarterFinal.some(
                              (i) =>
                                (i.group === "H" && i.rank === 1) ||
                                (i.group === "G" && i.rank === 2)
                            ) && "bg-transparent hover:opacity-70"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "H" && i.rank === 1) ||
                                  (i.group === "G" && i.rank === 2)
                              ) &&
                              quarterFinal.some((i) => i.name === team.name) &&
                              "bg-green-500"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "H" && i.rank === 1) ||
                                  (i.group === "G" && i.rank === 2)
                              ) &&
                              !quarterFinal.some((i) => i.name === team.name) &&
                              "bg-red-500"
                              }
                          `}
                          >
                            {team.name}
                          </div>
                        ))}
                    </div>
                  )}
                  <div className="opacity-25">vs</div>
                  {selectedTeams.filter((i) => i.group === "G" && i.rank === 2)
                    .length === 0 ? (
                    <div className="hexagon">
                      <span className="relative flex items-center justify-center w-full h-full">
                        G2
                      </span>{" "}
                    </div>
                  ) : (
                    <div className="hexagon">
                      {selectedTeams
                        .filter((i) => i.group === "G" && i.rank === 2)
                        .map((team, index) => (
                          <div
                            key={index}
                            onClick={() => setQuarterFinalTeams(team, 8)}
                            disabled={quarterFinal.some(
                              (i) =>
                                (i.group === "H" && i.rank === 1) ||
                                (i.group === "G" && i.rank === 2)
                            )}
                            className={`relative flex cursor-pointer items-center w-full justify-center h-full 
                        
                          ${!quarterFinal.some(
                              (i) =>
                                (i.group === "H" && i.rank === 1) ||
                                (i.group === "G" && i.rank === 2)
                            ) && "bg-transparent hover:opacity-70"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "H" && i.rank === 1) ||
                                  (i.group === "G" && i.rank === 2)
                              ) &&
                              quarterFinal.some((i) => i.name === team.name) &&
                              "bg-green-500"
                              }
                          ${quarterFinal.some(
                                (i) =>
                                  (i.group === "H" && i.rank === 1) ||
                                  (i.group === "G" && i.rank === 2)
                              ) &&
                              !quarterFinal.some((i) => i.name === team.name) &&
                              "bg-red-500"
                              }
                          `}
                          >
                            {team.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-2 space-y-10">
              {groups.map((group, index) => {
                if (group.side === "left") return false;
                return (
                  <div
                    key={index}
                    className="border-2 group-box overflow-hidden flex flex-col w-28 md:w-full md:col-span-1 shadow-md border-black text-center text-xs lg:text-base"
                  >
                    <div key={index} className="bg-black text-white">
                      {group.name} GRUBU
                    </div>

                    {teams.map((team) => {
                      /*eslint-disable-next-line*/
                      if (team.group !== group.name) return;
                      return (
                        <button
                          key={team.id}
                          onClick={() => handleClick(team)}
                          disabled={team.rank !== 0}
                          className={`flex w-full pt-1 cursor-pointer items-center  text-[8px] lg:text-base lg:flex justify-between px-4 
                  ${team.rank === 0 && "bg-transparent hover:opacity-70"}
                  ${(team.rank === 1 || team.rank === 2) && "bg-green-500"}
                  ${(team.rank === 3 || team.rank === 4) && "bg-red-500"} `}
                        >
                          <div className="flex w-4 h-5 lg:w-6 lg:h-6 justify-center items-center">
                            <img
                              src={`../assets/flags/${team.flag}`}
                              alt={team.name}
                              className="h-full py-1 w-full"
                            />
                          </div>
                          {team.name}
                          <div className="text-[10px] md:text-sm">
                            {team.rank !== 0 && "#" + team.rank}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
