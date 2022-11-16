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

    const filteredTeams = quarterFinal.filter((i) => i.side === side);
    if (filteredTeams.length === 0) {
      team.side = side;
      setQuarterFinal([...quarterFinal, team]);
    }
  };

  const setSemiFinalTeams = (team, side) => {
    if (semiFinal.findIndex((i) => i.id === team.id) !== -1) return;
    const filteredTeams = semiFinal.filter((i) => i.semiSide === side);
    if (filteredTeams.length === 0) {
      team.semiSide = side;
      setSemiFinal([...semiFinal, team]);
    }
  };

  const setFinalTeams = (team, side) => {
    if (final.findIndex((i) => i.id === team.id) !== -1) return;
    const filteredTeams = final.filter((i) => i.finalSide === side);
    if (filteredTeams.length === 0) {
      team.finalSide = side;
      setFinal([...final, team]);
    }
  };

  const setWinnerTeam = (team) => {
    setWinner(team);
  };

  return (
    <div className="bg-hero-pattern h-screen bg-center font-bold">
      <div className="mx-4">
        <div className="grid grid-cols-12 w-full h-3/4 pt-10 ">
          <div className="col-span-2 space-y-10 ">
            {groups.map((group, index) => {
              if (group.side === "right") return false;
              return (
                <div
                  key={index}
                  className="border-2 group-box overflow-hidden col-span-1 shadow-md border-black text-center"
                >
                  <div key={index} className="bg-black text-white">
                    {group.name}
                  </div>

                  {teams.map((team) => {
                    /*eslint-disable-next-line*/
                    if (team.group !== group.name) return;
                    return (
                      <div
                        key={team.id}
                        onClick={() => handleClick(team)}
                        className="pt-1 cursor-pointer hover:opacity-70"
                      >
                        {team.name.toUpperCase()}
                        {team.rank > 0 ? <span className="absolute text-xs">{"#" + team.rank}</span> : ""}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="col-span-1">
            <div className="flex flex-col justify-around gap-10 h-full relative text-center ml-2">
              <div className="h-20 border-2 border-black border-opacity-25 group-box flex flex-col justify-between py-1">
                {selectedTeams
                  .filter((i) =>
                    i.group === "A" && i.rank === 1)
                  .map((team, index) => (
                    <div
                      key={index}
                      onClick={() => setQuarterFinalTeams(team, 1)}
                      className="cursor-pointer"
                    >
                      {team.name}
                    </div>
                  ))}
                <div className="opacity-25">vs</div>
                {selectedTeams
                  .filter((i) => i.group === "B" && i.rank === 2)
                  .map((team, index) => (
                    <div
                      key={index}
                      onClick={() => setQuarterFinalTeams(team, 1)}
                      className="cursor-pointer"
                    >
                      {team.name}
                    </div>
                  ))}
              </div>

              <div className=" h-20 border-2 border-black border-opacity-25 group-box flex flex-col justify-between py-1">
                {selectedTeams
                  .filter((i) => i.group === "C" && i.rank === 1)
                  .map((team, index) => (
                    <div
                      key={index}
                      onClick={() => setQuarterFinalTeams(team, 2)}
                      className="cursor-pointer"
                    >
                      {team.name}
                    </div>
                  ))}
                <div className="opacity-25">vs</div>
                {selectedTeams
                  .filter((i) => i.group === "D" && i.rank === 2)
                  .map((team, index) => (
                    <div
                      key={index}
                      onClick={() => setQuarterFinalTeams(team, 2)}
                      className="cursor-pointer"
                    >
                      {team.name}
                    </div>
                  ))}
              </div>

              <div className="h-20 border-2 border-black border-opacity-25 group-box flex flex-col justify-between py-1">
                {selectedTeams
                  .filter((i) => i.group === "E" && i.rank === 1)
                  .map((team, index) => (
                    <div
                      key={index}
                      onClick={() => setQuarterFinalTeams(team, 3)}
                      className="cursor-pointer"
                    >
                      {team.name}
                    </div>
                  ))}
                <div className="opacity-25">vs</div>
                {selectedTeams
                  .filter((i) => i.group === "F" && i.rank === 2)
                  .map((team, index) => (
                    <div
                      key={index}
                      onClick={() => setQuarterFinalTeams(team, 3)}
                      className="cursor-pointer"
                    >
                      {team.name}
                    </div>
                  ))}
              </div>

              <div className="h-20 border-2 border-black border-opacity-25 group-box flex flex-col justify-between py-1">
                {selectedTeams
                  .filter((i) => i.group === "G" && i.rank === 1)
                  .map((team, index) => (
                    <div
                      key={index}
                      onClick={() => setQuarterFinalTeams(team, 4)}
                      className="cursor-pointer"
                    >
                      {team.name}
                    </div>
                  ))}
                <div className="opacity-25">vs</div>
                {selectedTeams
                  .filter((i) => i.group === "H" && i.rank === 2)
                  .map((team, index) => (
                    <div
                      key={index}
                      onClick={() => setQuarterFinalTeams(team, 4)}
                      className="cursor-pointer"
                    >
                      {team.name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-span-1 text-center flex flex-col h-full justify-around ml-4">
            <div className="h-20 border-2 border-black border-opacity-25 group-box flex flex-col justify-between py-1">
              {quarterFinal
                .filter((i) => i.side === 1)
                .map((team, index) => (
                  <div
                    key={index}
                    onClick={() => setSemiFinalTeams(team, 1)}
                    className="cursor-pointer"
                  >
                    {team.name}
                  </div>
                ))}
              <div className="opacity-25">vs</div>
              {quarterFinal
                .filter((i) => i.side === 2)
                .map((team, index) => (
                  <div
                    key={index}
                    onClick={() => setSemiFinalTeams(team, 1)}
                    className="cursor-pointer"
                  >
                    {team.name}
                  </div>
                ))}
            </div>

            <div className="h-20 border-2 border-black border-opacity-25 group-box flex flex-col justify-between py-1 mt-5">
              {quarterFinal
                .filter((i) => i.side === 3)
                .map((team, index) => (
                  <div
                    key={index}
                    onClick={() => setSemiFinalTeams(team, 2)}
                    className="cursor-pointer"
                  >
                    {team.name}
                  </div>
                ))}
              <div className="opacity-25">vs</div>
              {quarterFinal
                .filter((i) => i.side === 4)
                .map((team, index) => (
                  <div
                    key={index}
                    onClick={() => setSemiFinalTeams(team, 2)}
                    className="cursor-pointer"
                  >
                    {team.name}
                  </div>
                ))}
            </div>
          </div>
          <div className="col-span-1 text-center flex flex-col h-full justify-around ml-4">
            <div className="h-20 border-2 border-black border-opacity-25 group-box flex flex-col justify-between py-1">
              {semiFinal
                .filter((i) => i.semiSide === 1)
                .map((team, index) => (
                  <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => setFinalTeams(team, 1)}
                  >
                    {team.name}
                  </div>
                ))}
              <div className="opacity-25">vs</div>
              {semiFinal
                .filter((i) => i.semiSide === 2)
                .map((team, index) => (
                  <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => setFinalTeams(team, 1)}
                  >
                    {team.name}
                  </div>
                ))}
            </div>
          </div>

          <div className="col-span-2 text-center flex items-center h-full">
            <div className="flex flex-col w-full h-full justify-around">
              <div>Final</div>
              <div className="h-20 border-2 border-black border-opacity-25 group-box flex flex-col justify-between py-1 text-center w-1/2 mx-auto">
                <div className="cursor-pointer">
                  {final
                    .filter((i) => i.finalSide === 1)
                    .map((team, index) => (
                      <div
                        key={index}
                        className="cursor-pointertext-center w-full"
                        onClick={() => setWinnerTeam(team)}
                      >
                        {team.name}
                      </div>
                    ))}
                  <div className="opacity-25">vs</div>
                  <div className="cursor-pointer">
                    {final
                      .filter((i) => i.finalSide === 2)
                      .map((team, index) => (
                        <div
                          key={index}
                          className="cursor-pointer"
                          onClick={() => setWinnerTeam(team)}
                        >
                          {team.name}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="text-center">Winner: {winner.name}</div>
            </div>
          </div>

          <div className="col-span-1 text-center flex flex-col h-full justify-around mr-4">
            <div className="h-20 border-2 border-black border-opacity-25 group-box flex flex-col justify-between py-1">
              {semiFinal
                .filter((i) => i.semiSide === 3)
                .map((team, index) => (
                  <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => setFinalTeams(team, 2)}
                  >
                    {team.name}
                  </div>
                ))}
              <div className="opacity-25">vs</div>
              {semiFinal
                .filter((i) => i.semiSide === 4)
                .map((team, index) => (
                  <div
                    key={index}
                    className=" cursor-pointer"
                    onClick={() => setFinalTeams(team, 2)}
                  >
                    {team.name}
                  </div>
                ))}
            </div>
          </div>
          <div className="col-span-1 flex text-center flex-col h-full justify-around mr-4">
            <div className="h-20 border-2 border-black border-opacity-25 group-box flex flex-col justify-between py-1">
              {quarterFinal
                .filter((i) => i.side === 5)
                .map((team, index) => (
                  <div
                    key={index}
                    onClick={() => setSemiFinalTeams(team, 3)}
                    className="cursor-pointer"
                  >
                    {team.name}
                  </div>
                ))}
              <div className="opacity-25">vs</div>
              {quarterFinal
                .filter((i) => i.side === 6)
                .map((team, index) => (
                  <div
                    key={index}
                    onClick={() => setSemiFinalTeams(team, 3)}
                    className="cursor-pointer"
                  >
                    {team.name}
                  </div>
                ))}
            </div>

            <div className="h-20 border-2 border-black border-opacity-25 group-box flex flex-col justify-between py-1">
              {quarterFinal
                .filter((i) => i.side === 7)
                .map((team, index) => (
                  <div
                    key={index}
                    onClick={() => setSemiFinalTeams(team, 4)}
                    className="cursor-pointer"
                  >
                    {team.name}
                  </div>
                ))}
              <div className="opacity-25">vs</div>
              {quarterFinal
                .filter((i) => i.side === 8)
                .map((team, index) => (
                  <div
                    key={index}
                    onClick={() => setSemiFinalTeams(team, 4)}
                    className="cursor-pointer"
                  >
                    {team.name}
                  </div>
                ))}
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col justify-around gap-10 h-full relative text-center mr-2">
              <div className="h-20 border-2 border-black border-opacity-25 group-box flex flex-col justify-between py-1">
                {selectedTeams
                  .filter((i) => i.group === "B" && i.rank === 1)
                  .map((team, index) => (
                    <div
                      key={index}
                      onClick={() => setQuarterFinalTeams(team, 5)}
                      className="cursor-pointer"
                    >
                      {team.name}
                    </div>
                  ))}
                <div className="opacity-25">vs</div>
                {selectedTeams
                  .filter((i) => i.group === "A" && i.rank === 2)
                  .map((team, index) => (
                    <div
                      key={index}
                      onClick={() => setQuarterFinalTeams(team, 5)}
                      className="cursor-pointer"
                    >
                      {team.name}
                    </div>
                  ))}
              </div>

              <div className="h-20 border-2 border-black border-opacity-25 group-box flex flex-col justify-between py-1">
                {selectedTeams
                  .filter((i) => i.group === "D" && i.rank === 1)
                  .map((team, index) => (
                    <div
                      key={index}
                      onClick={() => setQuarterFinalTeams(team, 6)}
                      className="cursor-pointer"
                    >
                      {team.name}
                    </div>
                  ))}
                <div className="opacity-25">vs</div>
                {selectedTeams
                  .filter((i) => i.group === "C" && i.rank === 2)
                  .map((team, index) => (
                    <div
                      key={index}
                      onClick={() => setQuarterFinalTeams(team, 6)}
                      className="cursor-pointer"
                    >
                      {team.name}
                    </div>
                  ))}
              </div>

              <div className="h-20 border-2 border-black border-opacity-25 group-box flex flex-col justify-between py-1">
                {selectedTeams
                  .filter((i) => i.group === "F" && i.rank === 1)
                  .map((team, index) => (
                    <div
                      key={index}
                      onClick={() => setQuarterFinalTeams(team, 7)}
                      className="cursor-pointer"
                    >
                      {team.name}
                    </div>
                  ))}
                <div className="opacity-25">vs</div>
                {selectedTeams
                  .filter((i) => i.group === "E" && i.rank === 2)
                  .map((team, index) => (
                    <div
                      key={index}
                      onClick={() => setQuarterFinalTeams(team, 7)}
                      className="cursor-pointer"
                    >
                      {team.name}
                    </div>
                  ))}
              </div>

              <div className="h-20 border-2 border-black border-opacity-25 group-box flex flex-col justify-between py-1">
                {selectedTeams
                  .filter((i) => i.group === "H" && i.rank === 1)
                  .map((team, index) => (
                    <div
                      key={index}
                      onClick={() => setQuarterFinalTeams(team, 8)}
                      className="cursor-pointer"
                    >
                      {team.name}
                    </div>
                  ))}
                <div className="opacity-25">vs</div>
                {selectedTeams
                  .filter((i) => i.group === "G" && i.rank === 2)
                  .map((team, index) => (
                    <div
                      key={index}
                      onClick={() => setQuarterFinalTeams(team, 8)}
                      className="cursor-pointer"
                    >
                      {team.name}
                    </div>
                  ))}
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
                    {group.name}
                  </div>

                  {teams.map((team) => {
                    /*eslint-disable-next-line*/
                    if (team.group !== group.name) return;
                    return (
                      <div
                        key={team.id}
                        onClick={() => handleClick(team)}
                        className="pt-1 cursor-pointer hover:opacity-70"
                      >
                        {team.name.toUpperCase()}
                        {team.rank > 0 ? <span className="absolute text-xs">{"#" + team.rank}</span> : ""}
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
