import React, { useState } from "react";
import initialTeams from "../data/teams.json";
import initialGroups from "../data/groups.json";

export default function TournamentBrackets() {
  const [teams] = useState(initialTeams);
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
    }
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

  return (
    <div className="font-bold bg-hero-pattern h-screen lg:h-auto bg-center md:pt-2 md:p-10 bg-cover text-xs lg:text-base">
      <div className="lg:mx-8 mx-1">
        <div className="grid grid-cols-12 w-full h-3/4 pt-10">
          <div className="col-span-2 space-y-10 ">
            {groups.map((group, index) => {
              if (group.side === "right") return false;
              return (
                <div
                  key={index}
                  className="border-2 group-box overflow-hidden col-span-1 shadow-md border-black text-center text-xs lg:text-base"
                >
                  <div key={index} className="bg-black text-white">
                    {group.name} GRUBU
                  </div>

                  {teams.map((team) => {
                    /*eslint-disable-next-line*/
                    if (team.group !== group.name) return;
                    return (
                      <div
                        key={team.id}
                        onClick={() => handleClick(team)}
                        className="pt-1 cursor-pointer hover:opacity-70 text-[8px] lg:text-base lg:flex lg:justify-between lg:px-4"
                      >
                        {team.name}
                        <div className="hidden lg:flex  w-6 h-6  justify-center items-center">
                          <img src={`../assets/flags/${team.flag}`} alt={team.name} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="col-span-1 ml-5 lg:ml-0">
            <div className="flex flex-col justify-between lg:justify-around gap-10 h-full relative text-center ml-2">
              <div className="group-box flex flex-col justify-between items-center py-1">
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
                          className="relative flex cursor-pointer items-center w-full justify-center h-full"
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
                          className="relative flex cursor-pointer items-center w-full justify-center h-full"
                        >
                          {team.name}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className="  group-box flex flex-col justify-between items-center py-1">
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
                          className="relative flex cursor-pointer items-center w-full justify-center h-full"
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
                          className="relative flex cursor-pointer items-center w-full justify-center h-full"
                        >
                          {team.name}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className=" group-box flex flex-col justify-between items-center py-1">
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
                          className="relative flex cursor-pointer items-center w-full justify-center h-full"
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
                          className="relative flex cursor-pointer items-center w-full justify-center h-full"
                        >
                          {team.name}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className=" group-box flex flex-col justify-between items-center py-1">
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
                          className="relative flex cursor-pointer items-center w-full justify-center h-full"
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
                          className="relative flex cursor-pointer items-center w-full justify-center h-full"
                        >
                          {team.name}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-1 text-center flex flex-col h-full justify-around ml-[54px] lg:ml-4">
            <div className=" group-box flex flex-col justify-between items-center py-1">
              <div className="hexagon">
                {quarterFinal
                  .filter((i) => i.side === 1)
                  .map((team, index) => (
                    <div
                      key={index}
                      onClick={() => setSemiFinalTeams(team, 1)}
                      className="relative flex cursor-pointer items-center w-full justify-center h-full"
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
                      className="relative flex cursor-pointer items-center w-full justify-center h-full"
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
                      className="relative flex items-center justify-center w-full h-full"
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
                      className="relative flex items-center justify-center w-full h-full"
                    >
                      {team.name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-span-1 text-center flex flex-col h-full justify-around lg:ml-4 ml-8">
            <div className=" group-box flex flex-col justify-between items-center py-1">
              <div className="hexagon">
                {semiFinal
                  .filter((i) => i.semiSide === 1)
                  .map((team, index) => (
                    <div
                      key={index}
                      className="relative flex items-center justify-center w-full h-full"
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
                      className="relative flex items-center justify-center w-full h-full"
                      onClick={() => setFinalTeams(team, 1)}
                    >
                      {team.name}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="col-span-2 text-center flex items-center h-full">
            <div className="flex flex-col w-full h-full md:justify-around justify-between">
              <div className=" text-[14px] lg:text-lg">Final
                <div className="h-4 hidden"></div>
              </div>

              <div className=" group-box flex flex-col justify-between lg:justify-center py-1 text-center items-center w-1/2 mx-auto h-40">
                <div className="hexagon">
                  {final
                    .filter((i) => i.finalSide === 1)
                    .map((team, index) => (
                      <div
                        key={index}
                        className="w-full h-full relative flex items-center justify-center"
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
                        className="relative flex items-center justify-center w-full h-full"
                        onClick={() => setWinnerTeam(team)}
                      >
                        {team.name}
                      </div>
                    ))}
                </div>
              </div>
              {winner.name ? <div
                className={`text-[14px] lg:text-lg text-center`}
              >
                Winner: {winner.name}
              </div> : <div className="h-8"></div>}

            </div>
          </div>

          <div className="col-span-1 text-center flex flex-col h-full justify-around lg:mr-4 mr-8">
            <div className=" group-box flex flex-col justify-between items-center py-1">
              <div className="hexagon">
                {semiFinal
                  .filter((i) => i.semiSide === 3)
                  .map((team, index) => (
                    <div
                      key={index}
                      className="relative flex items-center justify-center w-full h-full"
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
                      className="relative flex items-center justify-center w-full h-full"
                      onClick={() => setFinalTeams(team, 2)}
                    >
                      {team.name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-span-1 flex text-center flex-col h-full justify-around -ml-16 lg:mr-4 lg:ml-0">
            <div className=" group-box flex flex-col justify-between items-center py-1">
              <div className="hexagon">
                {quarterFinal
                  .filter((i) => i.side === 5)
                  .map((team, index) => (
                    <div
                      key={index}
                      onClick={() => setSemiFinalTeams(team, 3)}
                      className="relative flex items-center justify-center w-full h-full"
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
                      className="relative flex items-center justify-center w-full h-full"
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
                      className="relative flex items-center justify-center w-full h-full"
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
                      className="relative flex items-center justify-center w-full h-full"
                    >
                      {team.name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-span-1 mr-4 lg:mr-0">
            <div className="flex flex-col justify-between lg:justify-around gap-10 h-full relative text-center mr-2">
              <div className=" group-box flex flex-col justify-between items-center py-1">
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
                          className="relative flex cursor-pointer items-center w-full justify-center h-full"
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
                          className="relative flex cursor-pointer items-center w-full justify-center h-full"
                        >
                          {team.name}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className=" group-box flex flex-col justify-between items-center py-1">
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
                          className="relative flex cursor-pointer items-center w-full justify-center h-full"
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
                          className="relative flex cursor-pointer items-center w-full justify-center h-full"
                        >
                          {team.name}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className=" group-box flex flex-col justify-between items-center py-1">
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
                          className="relative flex cursor-pointer items-center w-full justify-center h-full"
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
                          className="relative flex cursor-pointer items-center w-full justify-center h-full"
                        >
                          {team.name}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className=" group-box flex flex-col justify-between items-center py-1">
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
                          className="relative flex cursor-pointer items-center w-full justify-center h-full"
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
                          className="relative flex cursor-pointer items-center w-full justify-center h-full"
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
                  className="border-2 group-box overflow-hidden col-span-1 shadow-md border-black text-center"
                >
                  <div key={index} className="bg-black text-white">
                    {group.name} GRUBU
                  </div>

                  {teams.map((team) => {
                    /*eslint-disable-next-line*/
                    if (team.group !== group.name) return;
                    return (
                      <div
                        key={team.id}
                        onClick={() => handleClick(team)}
                        className="pt-1 cursor-pointer hover:opacity-70 text-[8px] lg:text-base lg:flex lg:justify-between lg:px-4"
                      >
                        {team.name}
                        <div className="hidden lg:flex  w-6 h-6  justify-center items-center">
                          <img src={`../assets/flags/${team.flag}`} alt={team.name} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
