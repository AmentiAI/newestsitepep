'use client'

import { useState, useMemo } from 'react'

export default function DosageCalculator() {
  const [vialMg, setVialMg] = useState(10)
  const [bacMl, setBacMl] = useState(2)
  const [doseMcg, setDoseMcg] = useState(250)
  const [syringeU, setSyringeU] = useState(100)

  const result = useMemo(() => {
    const mcgPerMl = (vialMg * 1000) / bacMl
    const ml = doseMcg / mcgPerMl
    const units = ml * syringeU
    return {
      concentration: mcgPerMl.toFixed(0),
      ml: ml.toFixed(3),
      units: units.toFixed(1),
    }
  }, [vialMg, bacMl, doseMcg, syringeU])

  return (
    <div className="card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Vial size (mg)" value={vialMg} onChange={setVialMg} step={0.5} />
        <Field label="Bac water added (ml)" value={bacMl} onChange={setBacMl} step={0.25} />
        <Field label="Research dose (mcg)" value={doseMcg} onChange={setDoseMcg} step={25} />
        <Field label="Syringe size (U-100 = 100)" value={syringeU} onChange={setSyringeU} step={1} />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Result label="Concentration" value={`${result.concentration} mcg/ml`} />
        <Result label="Volume per dose" value={`${result.ml} ml`} />
        <Result label="Syringe units" value={result.units} highlight />
      </div>

      <p className="mt-4 text-xs text-ink-500 leading-relaxed">
        For research-design calculation only. Not medical guidance. Always verify against
        your own protocol spec before drawing from a vial.
      </p>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  step,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  step: number
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider text-ink-600">{label}</span>
      <input
        type="number"
        value={value}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="mt-1.5 w-full rounded-md border-2 border-ink-200 bg-white px-3 py-2 text-lg font-semibold text-ink-900 focus:border-brand-400 focus:outline-none"
      />
    </label>
  )
}

function Result({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className={`rounded-md border-2 p-4 ${highlight ? 'border-brand-400 bg-brand-50' : 'border-ink-200 bg-white'}`}>
      <div className="text-xs font-bold uppercase tracking-wider text-ink-500">{label}</div>
      <div className="mt-1 text-2xl font-black text-ink-900">{value}</div>
    </div>
  )
}
