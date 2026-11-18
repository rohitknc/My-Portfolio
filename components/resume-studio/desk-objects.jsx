export function Pencil() {
  return (
    <svg className="desk-pencil" viewBox="0 0 50 720" aria-hidden="true">
      <defs>
        <linearGradient id="pencilBody">
          <stop stopColor="#a7b2b1" />
          <stop offset=".22" stopColor="#f5f7f4" />
          <stop offset=".57" stopColor="#fff" />
          <stop offset="1" stopColor="#bbc4c1" />
        </linearGradient>
        <linearGradient id="pencilGold">
          <stop stopColor="#917027" />
          <stop offset=".25" stopColor="#e9cf69" />
          <stop offset=".48" stopColor="#a17b23" />
          <stop offset=".75" stopColor="#f3d879" />
          <stop offset="1" stopColor="#9f7b2d" />
        </linearGradient>
        <linearGradient id="pencilWood">
          <stop stopColor="#b97d3b" />
          <stop offset=".5" stopColor="#e5ba82" />
          <stop offset="1" stopColor="#98612d" />
        </linearGradient>
        <filter id="pencilShadow" x="-100%" y="-10%" width="300%" height="130%">
          <feDropShadow
            dx="-7"
            dy="8"
            stdDeviation="7"
            floodColor="#263432"
            floodOpacity=".25"
          />
        </filter>
      </defs>
      <g filter="url(#pencilShadow)">
        <path d="M17 67 25 8 34 67Z" fill="url(#pencilWood)" />
        <path d="m22 29 3-21 3 21Z" fill="#263234" />
        <path d="M17 67H34V638H17Z" fill="url(#pencilBody)" />
        <path d="M17 67 21 60l4 7 5-7 4 7" fill="#f3f5ef" />
        <rect
          x="17"
          y="637"
          width="17"
          height="50"
          rx="1"
          fill="url(#pencilGold)"
        />
        {[643, 649, 661, 674, 681].map((y) => (
          <path
            key={y}
            d={`M17 ${y}H34`}
            stroke="#806722"
            strokeWidth=".7"
            opacity=".55"
          />
        ))}
        <path d="M17 687H34V702Q25 710 17 702Z" fill="#b63858" />
        <path d="M20 689H24V704H20Z" fill="#d45374" opacity=".7" />
        <text
          x="25"
          y="472"
          transform="rotate(90 25 472)"
          fill="#263432"
          fontFamily="Arial,sans-serif"
          fontSize="7"
          letterSpacing="1"
        >
          STUDIO / GRAPHITE 02
        </text>
        <circle
          cx="25.5"
          cy="462"
          r="4"
          fill="none"
          stroke="#394541"
          strokeWidth=".7"
        />
        <path d="M24 460v4m3-3-3 2" stroke="#394541" strokeWidth=".6" />
      </g>
    </svg>
  );
}
export function Headphones() {
  return (
    <svg className="desk-headphones" viewBox="0 0 500 650" aria-hidden="true">
      <defs>
        <linearGradient id="headband" x1="0" x2="1">
          <stop stopColor="#171c1e" />
          <stop offset=".2" stopColor="#343b3d" />
          <stop offset=".5" stopColor="#111517" />
          <stop offset=".8" stopColor="#363e40" />
          <stop offset="1" stopColor="#111718" />
        </linearGradient>
        <linearGradient id="shell" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fff" />
          <stop offset=".25" stopColor="#e6ebea" />
          <stop offset=".65" stopColor="#c4cece" />
          <stop offset="1" stopColor="#a0abad" />
        </linearGradient>
        <linearGradient id="cushion" x1="0" x2="1">
          <stop stopColor="#0c1012" />
          <stop offset=".3" stopColor="#343a3d" />
          <stop offset=".55" stopColor="#111719" />
          <stop offset=".8" stopColor="#303638" />
          <stop offset="1" stopColor="#0c1012" />
        </linearGradient>
        <radialGradient id="earInner">
          <stop stopColor="#020608" />
          <stop offset=".68" stopColor="#151a1b" />
          <stop offset="1" stopColor="#3e4445" />
        </radialGradient>
        <filter
          id="headphoneShadow"
          x="-70%"
          y="-40%"
          width="240%"
          height="230%"
        >
          <feDropShadow
            dx="-11"
            dy="19"
            stdDeviation="12"
            floodColor="#253332"
            floodOpacity=".33"
          />
        </filter>
        <filter id="cableShadow" x="-50%" y="-20%" width="200%" height="150%">
          <feDropShadow
            dx="-1"
            dy="3"
            stdDeviation="1.5"
            floodColor="#4f5f5d"
            floodOpacity=".35"
          />
        </filter>
        <pattern
          id="leatherGrain"
          width="7"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="m1 1 2 1m2 2 1-1M1 5l1-1"
            stroke="#818686"
            strokeWidth=".4"
            opacity=".4"
          />
        </pattern>
      </defs>
      <path
        d="M344 260c27 20 15 53 48 53s17-33 55-23 76 53 10 85-194 11-193 80 121 112 167 66-15-115-85-92-74 126 3 120c64-5 16-68-11-63"
        fill="none"
        stroke="#8b9b9c"
        strokeWidth="2.7"
        filter="url(#cableShadow)"
      />
      <path
        d="M344 259c27 20 15 53 48 53s17-33 55-23 76 53 10 85-194 11-193 80 121 112 167 66-15-115-85-92-74 126 3 120c64-5 16-68-11-63"
        fill="none"
        stroke="#e9efed"
        strokeWidth="1.4"
      />
      <g
        transform="translate(35 10) rotate(-18 230 200)"
        filter="url(#headphoneShadow)"
      >
        <path
          d="M100 224C60 126 114 34 209 29c93-5 159 79 126 180"
          stroke="url(#headband)"
          strokeWidth="17"
          fill="none"
        />
        <path
          d="M96 221C58 127 114 32 209 26c96-5 165 83 130 186"
          stroke="#919b9c"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M105 222C69 133 118 44 209 40c85-5 147 74 119 166"
          stroke="#6e797b"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="m96 199 6 39 16 32M332 186l-4 42-12 32"
          stroke="url(#shell)"
          strokeWidth="13"
          fill="none"
        />
        <path
          d="m97 200 6 39 14 27m216-78-5 39-11 28"
          stroke="#f3f6f5"
          strokeWidth="2"
          fill="none"
        />
        <g transform="translate(101 259) rotate(-14)">
          <rect
            x="-28"
            y="-44"
            width="56"
            height="105"
            rx="27"
            fill="url(#shell)"
          />
          <rect x="-24" y="-47" width="48" height="91" rx="22" fill="#a4b0b0" />
          <rect
            x="-23"
            y="-49"
            width="46"
            height="86"
            rx="21"
            fill="url(#cushion)"
          />
          <rect
            x="-23"
            y="-49"
            width="46"
            height="86"
            rx="21"
            fill="url(#leatherGrain)"
          />
          <ellipse cy="-7" rx="13" ry="31" fill="url(#earInner)" />
          <path
            d="M-24 39q24 7 48-2"
            fill="none"
            stroke="#b74644"
            strokeWidth="2.1"
          />
          <path
            d="M-22 45q22 7 44-1"
            fill="none"
            stroke="#fbffff"
            strokeWidth="2"
          />
        </g>
        <g transform="translate(316 252) rotate(28)">
          <rect
            x="-28"
            y="-51"
            width="57"
            height="110"
            rx="25"
            fill="url(#shell)"
          />
          <rect
            x="-24"
            y="-52"
            width="49"
            height="101"
            rx="23"
            fill="#859194"
          />
          <rect
            x="-23"
            y="-54"
            width="47"
            height="98"
            rx="23"
            fill="url(#cushion)"
          />
          <rect
            x="-23"
            y="-54"
            width="47"
            height="98"
            rx="23"
            fill="url(#leatherGrain)"
          />
          <ellipse cy="-6" rx="14" ry="34" fill="url(#earInner)" />
          <path d="M26-34v66" stroke="#b94542" strokeWidth="2" />
          <path d="M30-30v58" stroke="#f1f5f3" strokeWidth="2" />
        </g>
        <path d="M-1 231" fill="none" />
      </g>
      <g transform="translate(335 480) rotate(28)" filter="url(#cableShadow)">
        <rect
          x="-12"
          y="-3"
          width="37"
          height="6"
          rx="2"
          fill="#d5dedd"
          stroke="#859597"
          strokeWidth=".8"
        />
        <rect x="17" y="-3" width="7" height="6" fill="#ae423d" />
        <path d="M-12 0h-19" stroke="#dbe3e1" strokeWidth="3" />
        <path d="M-28-2v4m4-4v4m4-4v4" stroke="#657576" strokeWidth="1" />
      </g>
    </svg>
  );
}
