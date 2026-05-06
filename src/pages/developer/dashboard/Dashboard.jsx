import React from "react";
import Layout from "../Layout";
import { StoreContext } from "../../../store/StoreContext";
import useQueryData from "../../../functions/custom-hooks/useQueryData";
import { apiVersion } from "../../../functions/functions-general";
import {
  FaBullhorn,
  FaCalendarAlt,
  FaUserFriends,
  FaBuilding,
  FaBirthdayCake,
  FaTrophy,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { MdCelebration } from "react-icons/md";
import { HiUsers } from "react-icons/hi";

// ─── Avatar: primary-color rounded initials ──────────────────────────────────

const Avatar = ({ firstName = "", lastName = "", size = "md" }) => {
  const f = (firstName.trim()[0] ?? "").toUpperCase();
  const l = (lastName.trim()[0] ?? "").toUpperCase();
  const initials = f + l || "?";

  const sizes = {
    xs: "min-w-[1.75rem] min-h-[1.75rem] max-w-[1.75rem] max-h-[1.75rem] text-[10px]",
    sm: "min-w-[2.25rem] min-h-[2.25rem] max-w-[2.25rem] max-h-[2.25rem] text-xs",
    md: "min-w-[2.75rem] min-h-[2.75rem] max-w-[2.75rem] max-h-[2.75rem] text-sm",
    lg: "min-w-[3.25rem] min-h-[3.25rem] max-w-[3.25rem] max-h-[3.25rem] text-base",
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-primary text-white font-semibold uppercase select-none flex-shrink-0 ${sizes[size]}`}
    >
      {initials}
    </div>
  );
};

// ─── Section Card ─────────────────────────────────────────────────────────────

const SectionCard = ({ icon: Icon, iconColor = "text-primary", title, children, className = "" }) => (
  <div className={`bg-white rounded border border-gray-200 overflow-hidden ${className}`}>
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-100 bg-gray-50/60">
      <Icon className={`${iconColor} text-sm`} />
      <h2 className="text-xs font-bold text-primary uppercase tracking-wide">{title}</h2>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const SkeletonRow = () => (
  <div className="flex items-center gap-3 py-2 animate-pulse">
    <div className="rounded-full bg-gray-100 min-w-[2.25rem] min-h-[2.25rem]" />
    <div className="flex-1 space-y-1.5">
      <div className="h-2.5 bg-gray-100 rounded w-3/4" />
      <div className="h-2 bg-gray-50 rounded w-1/2" />
    </div>
  </div>
);

// ─── Date helpers (all use server_date from API to avoid timezone issues) ─────

const isBirthdayToday = (birthday, serverDate) => {
  if (!birthday || !serverDate) return false;
  // Compare month and day only — ignore year (birthday can be any year)
  const bd = birthday.substring(5); // "MM-DD"
  const sd = serverDate.substring(5); // "MM-DD"
  return bd === sd;
};

const isBirthdayThisMonth = (birthday, serverDate) => {
  if (!birthday || !serverDate) return false;
  const bdMonth = birthday.substring(5, 7); // "MM"
  const sdMonth = serverDate.substring(5, 7);
  const bdDay   = birthday.substring(8, 10);
  const sdDay   = serverDate.substring(8, 10);
  return bdMonth === sdMonth && bdDay !== sdDay;
};

const isAnniversaryThisMonth = (startDate, serverDate) => {
  if (!startDate || !serverDate) return false;
  const sdMonth = serverDate.substring(5, 7);
  const sdYear  = parseInt(serverDate.substring(0, 4), 10);
  const startMonth = startDate.substring(5, 7);
  const startYear  = parseInt(startDate.substring(0, 4), 10);
  return startMonth === sdMonth && startYear < sdYear;
};

const isNewEmployeeThisMonth = (startDate, serverDate) => {
  if (!startDate || !serverDate) return false;
  return (
    startDate.substring(0, 7) === serverDate.substring(0, 7) // "YYYY-MM"
  );
};

const getYearsOfService = (startDate, serverDate) => {
  if (!startDate || !serverDate) return 0;
  return parseInt(serverDate.substring(0, 4), 10) - parseInt(startDate.substring(0, 4), 10);
};

const formatShortDate = (dateStr) => {
  if (!dateStr) return "";
  // dateStr is "YYYY-MM-DD"
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const parts = dateStr.split("-");
  return `${months[parseInt(parts[1], 10) - 1]} ${parseInt(parts[2], 10)}`;
};

// ─── Who's Out (static — leave module not yet available) ─────────────────────

const WhosOut = () => {
  // Static placeholder — replace when leave module is available
  const todayOut = [
    { name: "Bosinos, Maribel",          type: "Maternity Leave", days: 74 },
    { name: "Consignado, Thea Lyzette",  type: "Vacation Leave",  days: 1  },
  ];
  const tomorrowOut = [
    { name: "Bosinos, Maribel", type: "Maternity Leave", days: 74 },
  ];

  const renderPerson = (item, idx) => {
    const parts = item.name.split(", ");
    const last  = parts[0] ?? "";
    const first = parts[1] ?? "";
    return (
      <div key={idx} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
        <Avatar firstName={first} lastName={last} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-800 truncate">{item.name}</p>
          <p className="text-[11px] text-gray-500">{item.type}</p>
          <p className="text-[11px] text-gray-400">Day(s): {item.days}</p>
        </div>
      </div>
    );
  };

  return (
    <SectionCard icon={FaCalendarAlt} title="Who's Out" className="h-fit">
      <div className="overflow-y-auto max-h-[280px]">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Today</p>
        {todayOut.map(renderPerson)}
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-3 mb-1">Tomorrow</p>
        {tomorrowOut.map(renderPerson)}
      </div>
    </SectionCard>
  );
};

// ─── Celebrations ─────────────────────────────────────────────────────────────

const Celebrations = ({ employees, serverDate, isLoading }) => {
  if (isLoading) {
    return (
      <SectionCard icon={MdCelebration} title="Celebrations" className="h-fit">
        <SkeletonRow />
        <SkeletonRow />
      </SectionCard>
    );
  }

  const todayBdays  = employees.filter(e => isBirthdayToday(e.employee_birthday, serverDate));
  const monthBdays  = employees.filter(e => isBirthdayThisMonth(e.employee_birthday, serverDate));
  const anniversaries = employees.filter(e => isAnniversaryThisMonth(e.employee_start_work_date, serverDate));
  const hasAny = todayBdays.length > 0 || monthBdays.length > 0 || anniversaries.length > 0;

  const monthName = serverDate
    ? new Date(serverDate + "T12:00:00").toLocaleString("en-US", { month: "long" })
    : "";

  return (
    <SectionCard icon={MdCelebration} title="Celebrations" className="h-fit">
      {!hasAny ? (
        <div className="text-center py-3">
          <div className="text-4xl mb-2">🎉</div>
          <p className="text-xs text-gray-500 leading-relaxed text-center">
            No celebration for today. However, we would like to express our
            sincere appreciation and gratitude for all the hard work of our
            employees. You are the backbone of our company and we value your
            contributions immensely. Thank you for your understanding and
            cooperation.
          </p>
        </div>
      ) : (
        <div className="space-y-1 max-h-[320px] overflow-y-auto pr-0.5">
          {todayBdays.length > 0 && (
            <div className="mb-3">
              <p className="text-[10px] font-bold text-primary uppercase tracking-wide flex items-center gap-1 mb-1.5">
                <FaBirthdayCake /> Birthday Today 🎂
              </p>
              {todayBdays.map(e => (
                <div key={e.employee_aid} className="flex items-center gap-3 py-1.5 border-b border-gray-50 last:border-0">
                  <Avatar firstName={e.employee_first_name} lastName={e.employee_last_name} size="xs" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">
                      {e.employee_last_name}, {e.employee_first_name}
                    </p>
                    <p className="text-[11px] text-gray-400">{e.department_name ?? "—"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {monthBdays.length > 0 && (
            <div className="mb-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1 mb-1.5">
                <FaBirthdayCake /> Birthdays this {monthName}
              </p>
              {monthBdays.map(e => (
                <div key={e.employee_aid} className="flex items-center gap-3 py-1.5 border-b border-gray-50 last:border-0">
                  <Avatar firstName={e.employee_first_name} lastName={e.employee_last_name} size="xs" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">
                      {e.employee_last_name}, {e.employee_first_name}
                    </p>
                    <p className="text-[11px] text-gray-400">{e.department_name ?? "—"}</p>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-700 flex-shrink-0">
                    {formatShortDate(e.employee_birthday)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {anniversaries.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1 mb-1.5">
                <FaTrophy /> Work Anniversaries this {monthName}
              </p>
              {anniversaries.map(e => {
                const yrs = getYearsOfService(e.employee_start_work_date, serverDate);
                return (
                  <div key={e.employee_aid} className="flex items-center gap-3 py-1.5 border-b border-gray-50 last:border-0">
                    <Avatar firstName={e.employee_first_name} lastName={e.employee_last_name} size="xs" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate">
                        {e.employee_last_name}, {e.employee_first_name}
                      </p>
                      <p className="text-[11px] text-gray-400">{e.department_name ?? "—"}</p>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-700 flex-shrink-0">
                      {yrs}yr{yrs !== 1 ? "s" : ""}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </SectionCard>
  );
};

// ─── Announcements ────────────────────────────────────────────────────────────

const AnnouncementItem = ({ item }) => {
  const [expanded, setExpanded] = React.useState(false);
  const PREVIEW = 220;
  const text    = item.memo_text ?? "";
  const hasMore = text.length > PREVIEW;

  return (
    <div className="flex gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="flex-shrink-0 mt-0.5">
        <FaBullhorn className="text-primary text-sm" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-800 leading-snug mb-0.5">
          {item.memo_category}
        </p>
        <p className="text-[11px] text-gray-400 mb-1.5">
          Date:{" "}
          <span className="font-semibold text-gray-600">
            {item.memo_date
              ? new Date(item.memo_date + "T12:00:00").toLocaleDateString("en-US", {
                  month: "long", day: "numeric", year: "numeric",
                })
              : item.memo_date}
          </span>
        </p>
        <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
          {expanded ? text : text.substring(0, PREVIEW)}
          {hasMore && !expanded && "…"}
        </p>
        {hasMore && (
          <button
            onClick={() => setExpanded(v => !v)}
            className="flex items-center gap-1 text-xs text-primary mt-1.5 hover:underline"
          >
            {expanded
              ? <><FaChevronUp className="text-[10px]" /> Show less</>
              : <><FaChevronDown className="text-[10px]" /> Read more</>
            }
          </button>
        )}
      </div>
    </div>
  );
};

const Announcements = ({ announcements, isLoading }) => (
  <SectionCard icon={FaBullhorn} title="Announcement" className="h-fit">
    <div className="pr-0.5">
      {isLoading && (
        <>
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </>
      )}
      {!isLoading && announcements.length === 0 && (
        <p className="text-xs text-gray-400 py-6 text-center">No announcements at this time.</p>
      )}
      {announcements.map(item => (
        <AnnouncementItem key={item.memo_aid} item={item} />
      ))}
    </div>
  </SectionCard>
);

// ─── New Employees ────────────────────────────────────────────────────────────

const NewEmployees = ({ employees, serverDate, isLoading }) => {
  const newOnes = employees.filter(e => isNewEmployeeThisMonth(e.employee_start_work_date, serverDate));

  return (
    <SectionCard icon={FaBuilding} title="Welcome to Frontline Business Solutions Inc." className="h-fit">
      {isLoading && <SkeletonRow />}
      {!isLoading && newOnes.length === 0 && (
        <p className="text-xs text-gray-400 text-center py-4">No new employee yet.</p>
      )}
      {!isLoading && newOnes.map(emp => (
        <div key={emp.employee_aid} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
          <Avatar firstName={emp.employee_first_name} lastName={emp.employee_last_name} size="xs" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-800 truncate">
              {emp.employee_last_name}, {emp.employee_first_name}
            </p>
            <p className="text-[11px] text-gray-400">{emp.department_name ?? "—"}</p>
          </div>
          <span className="text-[10px] text-gray-400 flex-shrink-0">
            {formatShortDate(emp.employee_start_work_date)}
          </span>
        </div>
      ))}
    </SectionCard>
  );
};

// ─── My Team ──────────────────────────────────────────────────────────────────

const MyTeam = ({ employees, isLoading }) => {
  const grouped = React.useMemo(() => {
    const map = {};
    employees.forEach(emp => {
      const dept = emp.department_name ?? "No Department";
      if (!map[dept]) map[dept] = [];
      map[dept].push(emp);
    });
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [employees]);

  return (
    <SectionCard icon={HiUsers} title="My Team" className="h-fit">
      {isLoading && (
        <div className="space-y-2">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      )}
      {!isLoading && grouped.length === 0 && (
        <p className="text-xs text-gray-400 text-center py-4">No employees found.</p>
      )}
      <div className="space-y-5">
        {grouped.map(([dept, members]) => (
          <div key={dept}>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              {dept}
            </p>
            <div className="flex flex-wrap gap-3">
              {members.map(emp => (
                <div
                  key={emp.employee_aid}
                  className="flex items-center gap-2"
                >
                  <Avatar
                    firstName={emp.employee_first_name}
                    lastName={emp.employee_last_name}
                    size="sm"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate max-w-[110px] leading-tight">
                      {emp.employee_last_name}, {emp.employee_first_name.split(" ")[0]}
                    </p>
                    <p className="text-[10px] text-gray-400">{dept}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

// ─── Dashboard Root ───────────────────────────────────────────────────────────

const Dashboard = () => {
  const { store } = React.useContext(StoreContext);

  // Use the dedicated dashboard endpoint — returns employees + announcements + server_date
  const { data, isLoading, isError } = useQueryData(
    `${apiVersion}/controllers/developers/dashboard/dashboard.php`,
    "get",
    "dashboard-main",
  );

  const employees     = data?.success ? (data.employees     ?? []) : [];
  const announcements = data?.success ? (data.announcements ?? []) : [];
  const serverDate    = data?.server_date ?? null;

  const firstName = store?.credentials?.data?.user_first_name ?? "Emmanuel";
  const lastName  = store?.credentials?.data?.user_last_name  ?? "Manalo";

  return (
    <Layout menu="dashboard">
      {/* PAGE HEADER */}
      <div className="mb-5">
        <h1 className="text-xl font-bold text-dark">
          Welcome {lastName}, {firstName}!
        </h1>
      </div>

      {isError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-600">
          Could not load dashboard data. Please check your connection.
        </div>
      )}

      {/* Top grid: left/right columns */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 mb-4 items-start">
        <div className="flex flex-col gap-4">
          <WhosOut />
          <Celebrations
            employees={employees}
            serverDate={serverDate}
            isLoading={isLoading}
          />
          <NewEmployees employees={employees} serverDate={serverDate} isLoading={isLoading} />
        </div>
        <div className="flex flex-col gap-4">
          <Announcements announcements={announcements} isLoading={isLoading} />
          <MyTeam employees={employees} isLoading={isLoading} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;