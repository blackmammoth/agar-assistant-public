import SectionWrapper from "../../SectionWrapper";

const Features = ({ dictionary }) => {
  const features = [
    {
      icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 1024 1024"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM305.8 637.7c3.1 3.1 8.1 3.1 11.3 0l138.3-137.6L583 628.5c3.1 3.1 8.2 3.1 11.3 0l275.4-275.3c3.1-3.1 3.1-8.2 0-11.3l-39.6-39.6a8.03 8.03 0 00-11.3 0l-230 229.9L461.4 404a8.03 8.03 0 00-11.3 0L266.3 586.7a8.03 8.03 0 000 11.3l39.5 39.7z"
            />
          </svg>
      ),
      title: dictionary?.items[0].title,
      desc: dictionary?.items[0].desc,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={0.8}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.5 3a.5.5 0 01.5.5v9a.5.5 0 01-.5.5h-13a.5.5 0 01-.5-.5v-9a.5.5 0 01.5-.5h13zm-13-1A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 5.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm-1.496-.854a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 11.708-.708l.146.147 1.146-1.147a.5.5 0 01.708 0zM7 9.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm-1.496-.854a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 01.708-.708l.146.147 1.146-1.147a.5.5 0 01.708 0z"
          />
        </svg>
      ),
      title: dictionary?.items[1].title,
      desc: dictionary?.items[1].desc,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 1024 1024"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"
          />
        </svg>
      ),
      title: dictionary?.items[2].title,
      desc: dictionary?.items[2].desc,
    },
  ];

  return (
    <SectionWrapper className="dark:my-0 bg-gray-50 dark:bg-gray-900 sm:my-16">
      <div
        id="features"
        className="custom-screen text-gray-600 dark:text-gray-300"
      >
        <div className="max-w-xl space-y-3">
          <h2 className="text-gray-800 dark:text-gray-50 text-3xl font-semibold sm:text-4xl">
            {dictionary?.sectionTitle}
          </h2>
          <p>{dictionary?.sectionDescription}</p>
        </div>
        <div className="mt-12">
          <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, idx) => (
              <li key={idx} className="flex gap-x-4">
                <div className="flex-none w-12 h-12 bg-white dark:bg-gray-800 border dark:border-gray-700 text-blue-600 dark:text-sky-500 rounded-lg flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg text-gray-800 dark:text-gray-100 font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-3">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Features;
