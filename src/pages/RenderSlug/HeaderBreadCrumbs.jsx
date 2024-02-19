import BreadCrumbs from "@/components/BreadCrumbs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useDataTables } from "@/hooks/dataTables/useDataTables";
import { SkeletonCard } from "@/components/SkeletonCard";
import ErrorPage from "@/ErrorPage";

const HeaderBreadCrumbs = ({ selectedSlug, setSelectedSlug, project }) => {
  const {
    data: tables_slugs,
    isLoading: isSlugsLoading,
    isError: isSlugsError,
  } = useDataTables(`?project_id=${project.id}`);


  if (isSlugsLoading) {
    return <SkeletonCard style="w-full xl:h-[1000px] md:h-[600px] h-[400px]" />;
  }

  if (isSlugsError) {
    return (
      <ErrorPage
        title={`Something went wrong while fetching data. Try reload page.`}
      />
    );
  }

  let slugs = Array.from(new Set(tables_slugs?.map((item) => item.data.slug)));

  return (
    <div className="flex gap-2 items-center hover:bg-white w-fit px-4 py-1 rounded-md">
      <BreadCrumbs
        items={[
          {
            name: "Projects",
            to: `/projects/`,
          },
          {
            name: project?.project_name,
            to: `/projects/${project?.id}`,
          },
        ]}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className="capitalize text-sm text-slate-900"
          >
            {selectedSlug}
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {slugs.map((item, i) => (
            <DropdownMenuItem
              className={`${
                selectedSlug === item
                  ? "capitalize font-semibold text-slate-800 cursor-pointer hover:bg-slate-300 hover:text-slate-900 hover:font-semibold"
                  : "text-neutral-400 capitalize cursor-pointer hover:bg-slate-300 hover:text-slate-900 hover:font-semibold"
              }`}
              onClick={() => setSelectedSlug(item)}
              key={i}
            >
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HeaderBreadCrumbs;
