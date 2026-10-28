"use client";

import { useState, useMemo } from "react";
import { INITIAL_BRANCHES, DEPARTMENTS } from "../constants";
import { Branch } from "../types";

export function useBranchesFilter() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("Todos");

  const filteredBranches = useMemo<Branch[]>(() => {
    if (selectedDepartment === "Todos") {
      return INITIAL_BRANCHES;
    }
    return INITIAL_BRANCHES.filter(
      (b) => b.department.toLowerCase() === selectedDepartment.toLowerCase()
    );
  }, [selectedDepartment]);

  return {
    selectedDepartment,
    setSelectedDepartment,
    departments: DEPARTMENTS,
    filteredBranches,
  };
}
