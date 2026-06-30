import { hospitalityGroups } from "@/lib/hospitality-groups";

const brands = [...hospitalityGroups, ...hospitalityGroups];

export function HospitalityMarquee() {
  return (
    <div className="hospitality-marquee mt-6 lg:mt-7">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent sm:w-20"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:w-20"
        aria-hidden="true"
      />
      <div
        className="hospitality-marquee-viewport"
        aria-label="Representative global hospitality and travel brands for industry context"
      >
        <ul className="hospitality-marquee-track">
          {brands.map((group, index) => (
            <li key={`${group.id}-${index}`}>
              <span className={`hospitality-wordmark ${group.wordmarkClass}`}>{group.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
