import React, { useState } from "react";
import initialTeams from "../data/teams.json";
import initialGroups from "../data/groups.json";

export default function TournamentBrackets() {
  const [teams] = useState(initialTeams);
  const [groups] = useState(initialGroups);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [quarterFinal, setQuarterFinal] = useState([]);
  const [semiFinal, setSemiFinal] = useState([]);

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
    console.log(team, side);
  };

  return (
    <div className="bg-hero-pattern h-screen bg-center font-bold">
      <div className="container mx-auto">
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
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="col-span-1 space-y-16">
            <div className="bg-lime-500 w-32 h-20">
              {selectedTeams
                .filter((i) => i.group === "A" && i.rank === 1)
                .map((team) => (
                  <div onClick={() => setQuarterFinalTeams(team, 1)}>
                    {team.name}
                  </div>
                ))}
              {selectedTeams
                .filter((i) => i.group === "B" && i.rank === 2)
                .map((team) => (
                  <div onClick={() => setQuarterFinalTeams(team, 1)}>
                    {team.name}
                  </div>
                ))}
            </div>

            <div className="bg-lime-500 w-32 h-20">
              {selectedTeams
                .filter((i) => i.group === "C" && i.rank === 1)
                .map((team) => (
                  <div onClick={() => setQuarterFinalTeams(team, 2)}>
                    {team.name}
                  </div>
                ))}
              {selectedTeams
                .filter((i) => i.group === "D" && i.rank === 2)
                .map((team) => (
                  <div onClick={() => setQuarterFinalTeams(team, 2)}>
                    {team.name}
                  </div>
                ))}
            </div>

            <div className="bg-lime-500 w-32 h-20">
              {selectedTeams
                .filter((i) => i.group === "E" && i.rank === 1)
                .map((team) => (
                  <div onClick={() => setQuarterFinalTeams(team, 3)}>
                    {team.name}
                  </div>
                ))}
              {selectedTeams
                .filter((i) => i.group === "F" && i.rank === 2)
                .map((team) => (
                  <div onClick={() => setQuarterFinalTeams(team, 3)}>
                    {team.name}
                  </div>
                ))}
            </div>

            <div className="bg-lime-500 w-32 h-20">
              {selectedTeams
                .filter((i) => i.group === "G" && i.rank === 1)
                .map((team) => (
                  <div onClick={() => setQuarterFinalTeams(team, 4)}>
                    {team.name}
                  </div>
                ))}
              {selectedTeams
                .filter((i) => i.group === "H" && i.rank === 2)
                .map((team) => (
                  <div onClick={() => setQuarterFinalTeams(team, 4)}>
                    {team.name}
                  </div>
                ))}
            </div>
          </div>
          <div className="col-span-1 space-y-16 ml-5">
            <div className="bg-lime-500 w-32 h-20 mt-20">
              {quarterFinal
                .filter((i) => i.side === 1)
                .map((team) => (
                  <div onClick={() => setSemiFinalTeams(team)}>{team.name}</div>
                ))}
              {quarterFinal
                .filter((i) => i.side === 2)
                .map((team) => (
                  <div onClick={() => setSemiFinalTeams(team)}>{team.name}</div>
                ))}
            </div>

            <div className="bg-lime-500 w-32 h-20 mt-20">
              {quarterFinal
                .filter((i) => i.side === 3)
                .map((team) => (
                  <div onClick={() => setSemiFinalTeams(team)}>{team.name}</div>
                ))}
              {quarterFinal
                .filter((i) => i.side === 4)
                .map((team) => (
                  <div onClick={() => setSemiFinalTeams(team)}>{team.name}</div>
                ))}
            </div>
          </div>

          <div className="col-span-4"></div>

          <div className="col-span-1 space-y-16 mr-20">
            <div className="bg-lime-500 w-32 h-20 mt-20">
              {quarterFinal
                .filter((i) => i.side === 5)
                .map((team) => (
                  <div onClick={() => setSemiFinalTeams(team)}>{team.name}</div>
                ))}
              {quarterFinal
                .filter((i) => i.side === 6)
                .map((team) => (
                  <div onClick={() => setSemiFinalTeams(team)}>{team.name}</div>
                ))}
            </div>

            <div className="bg-lime-500 w-32 h-20 mt-20">
              {quarterFinal
                .filter((i) => i.side === 7)
                .map((team) => (
                  <div onClick={() => setSemiFinalTeams(team)}>{team.name}</div>
                ))}
              {quarterFinal
                .filter((i) => i.side === 8)
                .map((team) => (
                  <div onClick={() => setSemiFinalTeams(team)}>{team.name}</div>
                ))}
            </div>
          </div>
          <div className="col-span-1 space-y-16">
            <div className="bg-lime-500 w-32 h-20">
              {selectedTeams
                .filter((i) => i.group === "B" && i.rank === 1)
                .map((team) => (
                  <div onClick={() => setQuarterFinalTeams(team, 5)}>
                    {team.name}
                  </div>
                ))}
              {selectedTeams
                .filter((i) => i.group === "A" && i.rank === 2)
                .map((team) => (
                  <div onClick={() => setQuarterFinalTeams(team, 5)}>
                    {team.name}
                  </div>
                ))}
            </div>

            <div className="bg-lime-500 w-32 h-20">
              {selectedTeams
                .filter((i) => i.group === "D" && i.rank === 1)
                .map((team) => (
                  <div onClick={() => setQuarterFinalTeams(team, 6)}>
                    {team.name}
                  </div>
                ))}
              {selectedTeams
                .filter((i) => i.group === "C" && i.rank === 2)
                .map((team) => (
                  <div onClick={() => setQuarterFinalTeams(team, 6)}>
                    {team.name}
                  </div>
                ))}
            </div>

            <div className="bg-lime-500 w-32 h-20">
              {selectedTeams
                .filter((i) => i.group === "F" && i.rank === 1)
                .map((team) => (
                  <div onClick={() => setQuarterFinalTeams(team, 7)}>
                    {team.name}
                  </div>
                ))}
              {selectedTeams
                .filter((i) => i.group === "E" && i.rank === 2)
                .map((team) => (
                  <div onClick={() => setQuarterFinalTeams(team, 7)}>
                    {team.name}
                  </div>
                ))}
            </div>

            <div className="bg-lime-500 w-32 h-20">
              {selectedTeams
                .filter((i) => i.group === "H" && i.rank === 1)
                .map((team) => (
                  <div onClick={() => setQuarterFinalTeams(team, 8)}>
                    {team.name}
                  </div>
                ))}
              {selectedTeams
                .filter((i) => i.group === "G" && i.rank === 2)
                .map((team) => (
                  <div onClick={() => setQuarterFinalTeams(team, 8)}>
                    {team.name}
                  </div>
                ))}
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
