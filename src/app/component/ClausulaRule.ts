"use client";

import Quill from "quill";
import { AutoFormatRule } from "./AutoFormat";

/**
 * ClausulaRule
 *
 * A rule for the AutoFormat module that formats lines starting with
 * "Clausula", "Cláusula", or "Cl." to be colored red.
 */
export const ClausulaRule: AutoFormatRule = {
  name: "clausula",
  callback: (quill: Quill): boolean => {
    // Get the editor text and split into lines
    const text = quill.getText();
    const lines = text.split("\n");
    let processed = false;

    // Process each line
    lines.forEach((line, index) => {
      // Trim the line to ignore leading whitespace
      const trimmedLine = line.trim();

      // Check if the line starts with any of the target phrases
      const clausulaPhrases = ["Clausula", "Cláusula", "Cl."];
      const isClausulaLine = clausulaPhrases.some((phrase) =>
        trimmedLine.toLowerCase().startsWith(phrase.toLowerCase()),
      );

      if (isClausulaLine) {
        // Calculate the position of the line in the document
        let lineStart = 0;
        for (let i = 0; i < index; i++) {
          lineStart += lines[i].length + 1; // +1 for the newline character
        }

        // Format the entire line with red color
        quill.formatText(lineStart, line.length, { color: "red" });
        processed = true;
      }
    });

    return processed;
  },
};

export default ClausulaRule;
