"use client";

import { useId, useState } from "react";
import { roadConditionContacts } from "../../karachi-data";
import { crossCityCopy, crossCityScenarios, crossCitySources, modeOrder, stageOrder } from "./crossCityData";
import type {
  CrossCityCheckpoint,
  CrossCityGuideProps,
  CrossCityMode,
  CrossCityScenario,
  CrossCityScenarioId,
} from "./types";
import styles from "./CrossCityGuide.module.css";

const smtaRouteSource = crossCitySources.find((source) => source.id === "smta-current-route-map");

function scenarioSupportsMode(scenario: CrossCityScenario, mode: CrossCityMode) {
  return scenario.modes.some((supportedMode) => supportedMode === mode);
}

export default function CrossCityGuide({
  locale = "ur-roman",
  reducedMotion = false,
  onFocusMap,
  mapSlot,
  externalCheckpointId,
}: CrossCityGuideProps) {
  const copy = crossCityCopy[locale];
  const titleId = useId();
  const panelId = useId();
  const [mode, setMode] = useState<CrossCityMode>("bike");
  const [selectedScenarioId, setSelectedScenarioId] = useState<CrossCityScenarioId>("hub-to-thatta");
  const [selectedCheckpointId, setSelectedCheckpointId] = useState("hub-n25-entry");

  const visibleScenarios = crossCityScenarios.filter((scenario) => scenarioSupportsMode(scenario, mode));
  const selectedScenario =
    visibleScenarios.find((scenario) => scenario.id === selectedScenarioId) ?? visibleScenarios[0];
  const selectedCheckpoint =
    selectedScenario.checkpoints.find((checkpoint) => checkpoint.id === (externalCheckpointId ?? selectedCheckpointId)) ??
    selectedScenario.checkpoints[0];

  const focusScenario = (scenario: CrossCityScenario) => {
    setSelectedScenarioId(scenario.id);
    setSelectedCheckpointId(scenario.checkpoints[0].id);
    onFocusMap?.({
      scenarioId: scenario.id,
      checkpointId: scenario.checkpoints[0].id,
      coordinates: scenario.focus.coordinates,
      zoom: scenario.focus.zoom,
    });
  };

  const chooseMode = (nextMode: CrossCityMode) => {
    const nextScenarios = crossCityScenarios.filter((scenario) => scenarioSupportsMode(scenario, nextMode));
    const nextScenario =
      nextScenarios.find((scenario) => scenario.id === selectedScenario.id) ?? nextScenarios[0];

    setMode(nextMode);
    setSelectedScenarioId(nextScenario.id);
    setSelectedCheckpointId(nextScenario.checkpoints[0].id);
    onFocusMap?.({
      scenarioId: nextScenario.id,
      checkpointId: nextScenario.checkpoints[0].id,
      coordinates: nextScenario.focus.coordinates,
      zoom: nextScenario.focus.zoom,
    });
  };

  const focusCheckpoint = (checkpoint: CrossCityCheckpoint) => {
    setSelectedCheckpointId(checkpoint.id);
    onFocusMap?.({
      scenarioId: selectedScenario.id,
      checkpointId: checkpoint.id,
      coordinates: checkpoint.coordinates,
      zoom: checkpoint.zoom,
    });
  };

  return (
    <section
      className={`${styles.guide} ${reducedMotion ? styles.reducedMotion : ""}`}
      aria-labelledby={titleId}
      aria-label={copy.regionLabel}
      lang={locale === "ur-roman" ? "ur-Latn" : "en"}
    >
      <header className={styles.header}>
        <div><p className={styles.orientation}>{copy.orientation}</p><h2 id={titleId}>{copy.title}</h2></div>
        <span className={styles.reviewed}>{copy.reviewed}</span>
      </header>

      <div className={styles.model} aria-label={copy.modelLabel}>
        <span className={styles.modelLabel}>{copy.modelLabel}</span>
        <ol>
          {stageOrder.map((stage, index) => {
            const item = copy.stages[stage];
            return (
              <li key={stage}>
                <span className={styles.stageCode}>{item.label}</span>
                <strong>{item.title}</strong>
                {index < stageOrder.length - 1 && (
                  <span className={styles.modelArrow} aria-hidden="true">
                    →
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className={styles.controls}>
        <div>
          <span className={styles.controlLabel}>{copy.modeLabel}</span>
          <div className={styles.modeTabs} role="group" aria-label={copy.modeLabel}>
            {modeOrder.map((item) => (
              <button
                key={item}
                id={`${panelId}-${item}`}
                type="button"
                aria-pressed={mode === item}
                className={mode === item ? styles.activeMode : ""}
                onClick={() => chooseMode(item)}
              >
                {copy.modes[item]}
              </button>
            ))}
          </div>
        </div>

        <p className={styles.modeNote}>{copy.modeNotes[mode]}</p>
      </div>

      {mode === "bike" && (
        <div className={styles.bikeBan} role="note">
          <strong>M-9</strong>
          <div><span>{copy.bikeBan}</span><small>{copy.bikeChecklist}</small></div>
        </div>
      )}

      <div
        id={panelId}
        className={styles.routeWorkspace}
        aria-live="polite"
      >
        <aside className={styles.scenarioPicker} aria-label={copy.routeLabel}>
          <div className={styles.pickerHeading}>
            <span>{copy.routeLabel}</span>
            <small>{copy.routesAvailable(visibleScenarios.length)}</small>
          </div>
          <ul>
            {visibleScenarios.map((scenario) => {
              const isSelected = scenario.id === selectedScenario.id;
              return (
                <li key={scenario.id}>
                  <button
                    type="button"
                    className={isSelected ? styles.selectedScenario : ""}
                    aria-pressed={isSelected}
                    onClick={() => focusScenario(scenario)}
                  >
                    <strong>{scenario.title[locale]}</strong>
                    <span>{scenario.shortRoute}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <article className={styles.routePanel}>
          <header className={styles.routeHeader}>
            <h3>{selectedScenario.title[locale]}</h3>
            <p>{selectedScenario.shortRoute}</p>
          </header>

          {mapSlot && <div className={styles.mapSlot}>{mapSlot}</div>}

          <div className={styles.checkpointHeading}>
            <strong>{copy.checkpointLabel}</strong>
          </div>

          <ol className={styles.checkpointRail}>
            {selectedScenario.checkpoints.map((checkpoint, index) => {
              const isSelected = checkpoint.id === selectedCheckpoint.id;
              const detailId = `${panelId}-${selectedScenario.id}-${checkpoint.id}-detail`;

              return (
                <li key={checkpoint.id}>
                  <button
                    type="button"
                    className={isSelected ? styles.selectedCheckpoint : ""}
                    aria-pressed={isSelected}
                    aria-describedby={detailId}
                    onClick={() => focusCheckpoint(checkpoint)}
                  >
                    <span className={styles.checkpointIndex} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.checkpointStage}>{copy.stageLabels[checkpoint.stage]}</span>
                    <strong>{checkpoint.label[locale]}</strong>
                    <span className={styles.checkpointDirection}>{copy.directions[checkpoint.direction]}</span>
                  </button>
                  <span id={detailId} className="sr-only">
                    {checkpoint.meaning[locale]}
                  </span>
                </li>
              );
            })}
          </ol>

          <div className={styles.checkpointDetail} aria-live="polite" aria-atomic="true">
            <div>
              <h4>{selectedCheckpoint.label[locale]}</h4>
              <p>{selectedCheckpoint.meaning[locale]}</p>
            </div>
            {onFocusMap && (
              <button type="button" onClick={() => focusCheckpoint(selectedCheckpoint)}>
                {copy.focusMap}
                <span aria-hidden="true">↗</span>
              </button>
            )}
          </div>

          <p className={styles.scenarioNote}>{selectedScenario.note[locale]}</p>
          {mode === "transit" &&
            selectedScenario.sourceIds.includes("smta-current-route-map") &&
            smtaRouteSource && (
              <a
                className={styles.scenarioSource}
                href={smtaRouteSource.url}
                target="_blank"
                rel="noreferrer"
              >
                {copy.transitSource}
                <span aria-hidden="true">↗</span>
              </a>
            )}
        </article>
      </div>

      <footer className={styles.safetyFooter}>
        <div>
          <strong>{copy.currentChecksTitle}</strong>
          <p>{copy.disclaimer}</p>
        </div>
        <div className={styles.helplines}>
          {roadConditionContacts.map((contact) => (
            <a
              key={contact.id}
              href={`tel:${contact.number}`}
              aria-label={`${copy.callHint} ${copy.currentChecks[contact.id]}: ${contact.number}`}
            >
              <span>{copy.currentChecks[contact.id]}</span>
              <strong>{contact.number}</strong>
            </a>
          ))}
        </div>
      </footer>
    </section>
  );
}
