import { sectionsMeta } from '@/config/sections';
import { sectionComponents } from '@/sections';

/** The home page is the sections in order. Reorder or remove them in src/config/sections.js. */
export default function Home() {
  return (
    <>
      {sectionsMeta.map(({ id }) => {
        const Component = sectionComponents[id];
        return <Component key={id} />;
      })}
    </>
  );
}
