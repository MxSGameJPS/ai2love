"use client";

import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import "./styles.css";

export default function BackgroundAnimation() {
  const [particleCount, setParticleCount] = useState(70);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setParticleCount(40);
      } else {
        setParticleCount(70);
      }
    };

    // Configuração inicial
    handleResize();

    // Adiciona listener de redimensionamento
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      console.log("Particles carregadas", container);
    },
    []
  );

  return (
    <div className="background-animation">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: {
            enable: true,
            zIndex: -1,
          },
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: ["#ec4899", "#a855f7", "#f472b6", "#d946ef"],
            },
            links: {
              color: {
                value: ["#ec4899", "#a855f7"],
              },
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1.2,
              triangles: {
                enable: true,
                opacity: 0.05,
                color: "#d946ef",
              },
            },
            collisions: {
              enable: false,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "out",
              },
              random: true,
              speed: 1.2,
              straight: false,
              trail: {
                enable: true,
                length: 3,
                fillColor: "#000000",
              },
            },
            number: {
              density: {
                enable: true,
                area: 1000,
              },
              value: particleCount,
            },
            opacity: {
              value: {
                min: 0.3,
                max: 0.7,
              },
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.2,
              },
            },
            shape: {
              type: ["circle", "triangle"],
            },
            size: {
              value: { min: 1.5, max: 5 },
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 1,
                sync: false,
              },
            },
            twinkle: {
              lines: {
                enable: true,
                frequency: 0.05,
                opacity: 0.5,
                color: {
                  value: ["#ec4899", "#a855f7"],
                },
              },
              particles: {
                enable: true,
                frequency: 0.08,
                opacity: 0.8,
              },
            },
          },
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
                parallax: {
                  enable: true,
                  force: 60,
                  smooth: 10,
                },
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
              bubble: {
                distance: 200,
                size: 20,
                duration: 2,
              },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}
