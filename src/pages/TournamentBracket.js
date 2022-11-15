import React, { useState } from "react";

export default function TournamentBracket() {
  const [teams] = useState([
    {
      id: 1,
      name: "Brezilya",
    },
    {
      id: 2,
      name: "Fransa",
    },
    {
      id: 3,
      name: "Belçika",
    },
    {
      id: 4,
      name: "Hırvatistan",
    },
    {
      id: 5,
      name: "Sırbistan",
    },
    {
      id: 6,
      name: "İspanya",
    },
    {
      id: 7,
      name: "İsviçre",
    },
    {
      id: 8,
      name: "İngiltere",
    },
    {
      id: 9,
      name: "Hollanda",
    },
    {
      id: 10,
      name: "Arjantin",
    },
    {
      id: 11,
      name: "İran",
    },
    {
      id: 12,
      name: "Güney Kare",
    },
    {
      id: 13,
      name: "Japonya",
    },
    {
      id: 14,
      name: "Ekvador",
    },
    {
      id: 15,
      name: "ABD",
    },
    {
      id: 16,
      name: "Meksika",
    },
  ]);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between">
        <div>
          {teams.slice(0, 7).map((team) => (
            <div key={team.id}>{team.name}</div>
          ))}
        </div>

        <div>
          {teams.slice(-7).map((team) => (
            <div key={team.id}>{team.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
