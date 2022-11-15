import React, { useState } from "react";
import initialTeams from "../data/teams.json";
import initialGroups from "../data/groups.json";

export default function TournamentBrackets() {
  const [teams, setTeams] = useState(initialTeams);
  //eslint-disable-next-line
  const [groups, setGroups] = useState(initialGroups);

  const handleClick = (team) => {
    if (team.rank !== 0) return;
    const teamsClone = teams;
    let highestRank = calculateHighestRankByGroup(team.group);

    const index = teams.findIndex((i) => i === team);
    if (highestRank > 4) return;
    teamsClone[index].rank = ++highestRank;

    if (highestRank <= 2)
      teamsClone[index].status = `${teamsClone[index].status.slice(0, 3)}${Number(teamsClone[index].status.slice(-2)) / 2
        }`;

    setTeams([...teamsClone]);
  };

  const calculateHighestRankByGroup = (group) => {
    const filteredGroup = teams.filter((i) => i.group === group);
    return Math.max(...filteredGroup.map((i) => i.rank));
  };

  return (
    <div className="bg-hero-pattern h-screen bg-center font-bold">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 w-full h-3/4 pt-10 ">
          <div className="col-span-2 space-y-10 ">
            {groups.map((group, index) => {
              if (group.side === 'right') return false
              return (
                <div
                  key={index}
                  className={`border col-span-1 border-black text-center`}
                >
                  <div key={index} className="bg-black text-white">
                    {group.name}
                  </div>

                  {teams.map((team) => {
                    /*eslint-disable-next-line*/
                    if (team.group !== group.id) return;
                    return (
                      <div key={team.id} onClick={() => handleClick(team)}>
                        {team.name.toUpperCase()}
                      </div>
                    );
                  })}
                </div>
              )
            }
            )}
          </div>
          <div className="col-span-8">10luk</div>
          <div className="col-span-2 space-y-10">
            {groups.map((group, index) => {
              if (group.side === 'left') return false
              return (
                <div
                  key={index}
                  className={`border col-span-1 border-black text-center`}
                >
                  <div key={index} className="bg-black text-white">
                    {group.name}
                  </div>

                  {teams.map((team) => {
                    /*eslint-disable-next-line*/
                    if (team.group !== group.id) return;
                    return (
                      <div key={team.id} onClick={() => handleClick(team)}>
                        {team.name.toUpperCase()}
                      </div>
                    );
                  })}
                </div>
              )
            }
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
