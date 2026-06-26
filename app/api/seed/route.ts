import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // We need to make sure this is set in .env.local
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // 1. Get Home Page ID
    const { data: homePage, error: pageError } = await supabase
      .from('pages')
      .select('id')
      .eq('slug', 'home')
      .single();

    if (pageError || !homePage) {
      return NextResponse.json({ error: 'Home page not found' }, { status: 404 });
    }

    const pageId = homePage.id;

    // 2. Define Blocks
    const blocks = [
      {
        page_id: pageId,
        type: 'hero',
        content_json: {
          overhead: 'Una infancia acompañada puede cambiarlo todo',
          title: 'Reconstruyendo <span class="accent">vínculos</span>, acompañando <span class="accent-verde">familias</span>.'
        },
        order_index: 0
      },
      {
        page_id: pageId,
        type: 'proyecto',
        content_json: {
          title: '¿Qué es Volver a Casa?',
          description: '<p class="lead" style="font-family: Capriola; font-size: 18px;">Un proyecto de <a href="https://www.manantial.org" target="_blank" rel="noopener noreferrer"><strong>Fundación Manantial</strong></a>, de innovación social que acompaña a niños y niñas institucionalizados y sus familias en procesos de reunificación familiar, creando las condiciones necesarias para reconstruir vínculos protectores y entornos de cuidado y bienestar.</p><p style="color: var(--ink-soft); font-family: Capriola; font-weight: 400;">No se trata solo de volver, sino de hacerlo a un entorno que pueda sostener el bienestar del niño o la niña. Por eso acompañamos <strong>antes, durante y después</strong> del regreso.</p><p style="color: var(--ink-soft); font-family: Capriola; font-weight: 400; margin-top: 16px;">Cofinanciado por la Unión Europea, el Ministerio de Trabajo y Economía Social y Fondos Europeos, y el Ministerio de Derechos Sociales, Consumo y Agenda 2030. Con la colaboración de Fundación Nemesio Díez y la Dirección General de Infancia, Familia y Fomento de la Natalidad de la Comunidad de Madrid.</p>',
          items: [
            {
              title: 'Apoyo psicológico',
              description: 'A niños y niñas institucionalizados en centros residenciales y a sus familias de origen.'
            },
            {
              title: 'Intervención social',
              description: 'Fortalecer capacidades parentales para lograr el retorno de los niños al hogar en condiciones de seguridad y estabilidad.'
            },
            {
              title: 'Trabajo en red',
              description: 'Con los sistemas de protección.'
            }
          ]
        },
        order_index: 1
      },
      {
        page_id: pageId,
        type: 'objetivos',
        content_json: {
          title: 'Crecer en familia lo cambia todo.',
          description: 'La institucionalización prolongada afecta al desarrollo emocional, social y familiar de los niños y niñas, pudiendo tener un impacto futuro en su salud mental. Estos son los datos que mueven el proyecto y los objetivos que lo guían.',
          items: [
            'Reducir el tiempo que niños y niñas pasan en centros de protección.',
            'Acompañar reunificaciones seguras y sostenidas en el tiempo.',
            'Fortalecer las capacidades parentales de las familias.',
            'Contribuir a la mejora del sistema de protección mediante evidencia y conocimiento.'
          ],
          metrics: [
            { val: '-40%', desc: 'tiempo medio en acogimiento', sub: 'OBJETIVO PROVISIONAL' },
            { val: '85%', desc: 'reunificaciones estables a 12 meses', sub: 'OBJETIVO PROVISIONAL' },
            { val: '120', desc: 'familias acompañadas', sub: 'DATO PROVISIONAL' },
            { val: '70%', desc: 'de las familias mejora con acompañamiento', sub: 'OBJETIVO PROVISIONAL' }
          ]
        },
        order_index: 2
      },
      {
        page_id: pageId,
        type: 'experiencia',
        content_json: {
          overhead: 'HABLEMOS DE NUESTRA EXPERIENCIA',
          title: 'Volver a Casa es el resultado de un largo recorrido.',
          description: 'Es el resultado de años de experiencia, investigación, prevención y aprendizaje junto a familias, profesionales y organizaciones. Este es el recorrido que lo ha hecho posible.',
          hitos: [
            { sub: 'ORIGEN - +15 AÑOS', title: 'Casa Verde', desc: 'Más de 15 años trabajando en salud mental para evitar la separación de los niños con sus madres promoviendo vínculos seguros y estables.' },
            { sub: 'INVESTIGACIÓN', title: 'Más Casa', desc: 'Investigación, evaluación, impacto y retorno social de la metodología Casa Verde' },
            { sub: 'CREACIÓN ÁREA', title: 'Prevención y bienestar infantojuvenil', desc: 'Prevención de la salud mental y promoción del bienestar emocional en niños y adolescentes' },
            { sub: 'EL PROYECTO - HOY', title: 'Volver a Casa', desc: 'Conocimiento aplicado al acompañamiento especializado en procesos de reunificación familiar.' }
          ],
          cta: {
            text: 'Volver a Casa es un proyecto que forma parte de la plataforma VIDAS, un ecosistema de innovación social que conecta a diferentes actores e iniciativas que abordan los retos complejos relacionados con la desinstitucionalización.',
            btnText: 'Conocer la Plataforma VIDAS ↗',
            btnUrl: 'https://plataformavidas.org'
          }
        },
        order_index: 3
      },
      {
        page_id: pageId,
        type: 'actualidad',
        content_json: {
          title: 'Actualidad',
          overhead: 'Lo último del proyecto.',
          description: 'Noticias, jornadas, hitos y participación en congresos.'
        },
        order_index: 4
      },
      {
        page_id: pageId,
        type: 'videos',
        content_json: {
          title: 'Multimedia',
          overhead: 'Vídeos más significativos.',
          description: 'Descubre más sobre nuestro trabajo, testimonios y el impacto del acompañamiento a través de nuestros vídeos.'
        },
        order_index: 5
      }
    ];

    // Delete existing blocks for home to avoid duplicates
    await supabase.from('page_blocks').delete().eq('page_id', pageId);

    // Insert new blocks
    const { data: inserted, error: insertError } = await supabase
      .from('page_blocks')
      .insert(blocks)
      .select();

    if (insertError) {
      throw insertError;
    }

    // 3. Seed Footer Logos in Settings
    const footerLogos = [
      { id: 'mdsca', imgUrl: '/assets/logo-mdsca.jpg', alt: 'Ministerio de Derechos Sociales, Consumo y Agenda 2030', overhead: '', cssClass: 'funder-mdsca' },
      { id: 'fse', imgUrl: '/assets/logo-fse.png', alt: 'Cofinanciado por el FSE+', overhead: '', cssClass: 'funder-fse' },
      { id: 'ue', imgUrl: '/assets/logo-union-europea.png', alt: 'Financiado por la Unión Europea · NextGenerationEU', overhead: '', cssClass: 'funder-ue' },
      { id: 'manantial', imgUrl: '/assets/logo-manantial.png', alt: 'Fundación Manantial', overhead: '', cssClass: 'funder-manantial' },
      { id: 'nemesio', imgUrl: '/assets/logo-nemesio-diez.png', alt: 'Fundación Nemesio Díez', overhead: 'Con la colaboración de', cssClass: 'funder-nemesio' },
      { id: 'madrid', imgUrl: '/assets/logo-comunidad-madrid.png', alt: 'Comunidad de Madrid', overhead: '', cssClass: 'funder-madrid' },
    ];

    const { error: settingsError } = await supabase
      .from('settings')
      .upsert({ key: 'footer_logos', data: footerLogos }, { onConflict: 'key' });

    if (settingsError) {
      throw settingsError;
    }

    return NextResponse.json({ success: true, message: 'Seeded home blocks and footer logos', inserted });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
