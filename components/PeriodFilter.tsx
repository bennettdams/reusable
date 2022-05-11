import { KeyboardEvent, useState } from "react";
import { useTranslation } from "../services/i18n/use-translation";
import { formatDateToFixedString } from "../util/date-time";
import { FormLabel } from "./FormLabel";

export interface PeriodFilterItem {
  from: Date | null;
  to: Date | null;
}

export function PeriodFilter({
  item,
  onChange,
  vertical = false,
}: {
  item: PeriodFilterItem;
  onChange: (newFilterItem: PeriodFilterItem) => void;
  vertical?: boolean;
}): JSX.Element {
  const { t } = useTranslation();
  const [idFrom] = useState("input-from");
  const [idTo] = useState("input-to");

  function checkResetKey(key: string) {
    return key === "Escape" || key === "Delete" || key === "Backspace";
  }

  return (
    <div
      className={`flex w-full ${vertical ? "flex-col space-y-4" : "flex-row"}`}
    >
      <div className="flex-1">
        <FormLabel id={idFrom}>{t("from")}</FormLabel>
        <input
          className="w-36 rounded-md border-gray-300 text-xs shadow-sm hover:shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="date"
          id={idFrom}
          value={!item.from ? "" : formatDateToFixedString(item.from)}
          placeholder={t("from")}
          onChange={(e) =>
            onChange({ ...item, from: new Date(Date.parse(e.target.value)) })
          }
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
            if (checkResetKey(event.key)) onChange({ ...item, from: null });
          }}
        />
      </div>

      <div className="flex-1">
        <FormLabel id={idTo}>{t("to")}</FormLabel>
        <input
          className="w-36 rounded-md border-gray-300 text-xs shadow-sm hover:shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="date"
          id={idTo}
          placeholder={t("to")}
          value={!item.to ? "" : formatDateToFixedString(item.to)}
          onChange={(e) =>
            onChange({ ...item, to: new Date(Date.parse(e.target.value)) })
          }
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
            if (checkResetKey(event.key)) onChange({ ...item, to: null });
          }}
        />
      </div>
    </div>
  );
}
