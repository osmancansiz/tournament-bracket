import React, { useEffect, useState } from "react";

export default function TournamentBrackets() {
  const [teams] = useState([
    {
      id: 1,
      name: "Katar",
      side: "left",
      group: "A",
    },
    {
      id: 2,
      name: "Ekvador",
      side: "left",
      group: "A",
    },
    {
      id: 3,
      name: "Senegal",
      side: "left",
      group: "A",
    },
    {
      id: 4,
      name: "Hollanda",
      side: "left",
      group: "A",
    },
    {
      id: 5,
      name: "İngiltere",
      side: "right",
      group: "B",
    },
    {
      id: 6,
      name: "İran",
      side: "right",
      group: "B",
    },
    {
      id: 7,
      name: "ABD",
      side: "right",
      group: "B",
    },
    {
      id: 8,
      name: "Galler",
      side: "right",
      group: "B",
    },
    {
      id: 9,
      name: "Arjantin",
      side: "left",
      group: "C",
    },
    {
      id: 10,
      name: "Suudi Arabistan",
      side: "left",
      group: "C",
    },
    {
      id: 11,
      name: "Meksika",
      side: "left",
      group: "C",
    },
    {
      id: 12,
      name: "Polonya",
      side: "left",
      group: "C",
    },
    {
      id: 13,
      name: "Fransa",
      side: "right",
      group: "D",
    },
    {
      id: 14,
      name: "Avustralya",
      side: "right",
      group: "D",
    },
    {
      id: 15,
      name: "Danimarka",
      side: "right",
      group: "D",
    },
    {
      id: 16,
      name: "Tunus",
      side: "right",
      group: "D",
    },
    {
      id: 17,
      name: "İspanya",
      side: "left",
      group: "E",
    },
    {
      id: 18,
      name: "Kosta Rika",
      side: "left",
      group: "E",
    },
    {
      id: 19,
      name: "Almanya",
      side: "left",
      group: "E",
    },
    {
      id: 20,
      name: "Japonya",
      side: "left",
      group: "E",
    },
    {
      id: 21,
      name: "Belçika",
      side: "right",
      group: "F",
    },
    {
      id: 22,
      name: "Kanada",
      side: "right",
      group: "F",
    },
    {
      id: 23,
      name: "Fas",
      side: "right",
      group: "F",
    },
    {
      id: 24,
      name: "Hırvatistan",
      side: "right",
      group: "F",
    },
    {
      id: 25,
      name: "Brezilya",
      side: "left",
      group: "G",
    },
    {
      id: 26,
      name: "Sırbistan",
      side: "left",
      group: "G",
    },
    {
      id: 27,
      name: "İsviçre",
      side: "left",
      group: "G",
    },
    {
      id: 28,
      name: "Kamerun",
      side: "left",
      group: "G",
    },
    {
      id: 29,
      name: "Portekiz",
      side: "right",
      group: "H",
    },
    {
      id: 30,
      name: "Gana",
      side: "right",
      group: "H",
    },
    {
      id: 31,
      name: "Uruguay",
      side: "right",
      group: "H",
    },
    {
      id: 32,
      name: "Güney Kore",
      side: "right",
      group: "H",
    },
  ]);
  const [winnersLeft, setWinnersLeft] = useState([]);
  const [winnersRight, setWinnersRight] = useState([]);
  const [groups, setGroups] = useState([]);

  const handleWinner = (team) => {
    if (team.side === "left") setWinnersLeft([...winnersLeft, team]);
    else setWinnersRight([...winnersRight, team]);
  };

  useEffect(() => {
    const groups = [];
    teams.forEach((team) => {
      if (groups.includes(team.group)) return;
      groups.push(team.group);
    });
    setGroups([...groups]);
  }, [teams]);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2">
        {groups.map((group, index) => (
          <div key={index}>
            <div>{group}</div>
            {teams.map((team) => {
              /*eslint-disable-next-line*/
              if (team.group !== group) return;
              return (
                <div key={team.id} onClick={() => handleWinner(team)}>
                  {team.name}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
