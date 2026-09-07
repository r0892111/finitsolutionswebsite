import { BREIN_PAGINA } from "./copy";

/**
 * Het beeld in de hero: geen chatbot, geen animatie, maar wat het product
 * letterlijk is. Eén pagina uit een AI-brein, op papier, en daaronder wat
 * de AI met die pagina doet.
 */
export function BreinPagina() {
  const p = BREIN_PAGINA;
  return (
    <figure className="mx-auto w-full max-w-[26rem] lg:mx-0 lg:ml-auto">
      <div className="fs-paper rounded-[10px] border border-[#E8E6DC] bg-[#FFFEFA] px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex items-baseline justify-between gap-4 text-[0.75rem] text-[#76706A]">
          <span>{p.bedrijf}</span>
          <span>{p.pagina}</span>
        </div>

        <p className="mt-4 text-[1.5rem] font-semibold leading-none tracking-[-0.01em] text-[#1A2D63]">
          {p.titel}
        </p>

        <dl className="mt-4 divide-y divide-[#EFEDE3] border-y border-[#EFEDE3]">
          {p.rijen.map((rij) => (
            <div key={rij.k} className="grid grid-cols-[6.25rem_1fr] gap-3 py-2.5 text-[0.9rem] leading-[1.45]">
              <dt className="text-[#76706A]">{rij.k}</dt>
              <dd className="text-[#2A2620]">{rij.v}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-4 text-[0.75rem] text-[#94908A]">{p.voet}</p>
      </div>

      {/* Wat de AI met die pagina doet: een korte uitwisseling, geen chatvenster. */}
      <div className="mt-3 rounded-[10px] border border-[#E8E6DC] bg-[#F5F3EC] px-5 py-4 text-[0.9rem] leading-[1.5]">
        <div className="grid grid-cols-[2.25rem_1fr] gap-x-2 gap-y-2.5">
          <span className="font-medium text-[#76706A]">Jij</span>
          <p className="text-[#57514A]">{p.gesprek.jij}</p>
          <span className="font-medium text-[#1A2D63]">AI</span>
          <p className="text-[#2A2620]">{p.gesprek.ai}</p>
        </div>
      </div>

      <figcaption className="mt-4 text-center text-[0.9rem] leading-[1.5] text-[#76706A] lg:text-left">
        {p.onderschrift}
      </figcaption>
    </figure>
  );
}
