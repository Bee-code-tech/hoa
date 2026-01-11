function SubNav() {
  const links = [
    "Door Supervisor Course",
    "Door Supervisor Refresher",
    "Security Guard Refresher",
    "Emergency First Aid",
    "First Aid at Work",
    "CSCS Green Card Course",
    "SIA Top-Up Training",
  ];

  return (
    <div className="border-b bg-white">
      <div
        className="
          max-w-7xl mx-auto
          px-4
          flex gap-6
          overflow-x-auto
          whitespace-nowrap
          scrollbar-hide
          py-3 
        "
      >
        {links.map((link) => (
          <a
            key={link}
            className="
              text-lg font-medium text-gray-700
              hover:text-blue-900
              shrink-0
              cursor-pointer
            "
          >
            {link}
          </a>
        ))}
      </div>
    </div>
  );
}

export default SubNav;
