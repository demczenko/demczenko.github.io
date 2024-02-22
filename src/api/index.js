import { TableService } from "./tables/init";
import { TemplatesService } from "./templates/init";
import { ProjectService } from "./projects/init";
import { ColumnService } from "./columns/init";
import { ComponentsService } from "./components/init";
import { DataTableService } from "./tables data/init";
import { ProjectStyleService } from "./projects_style/init";
import { LayoutService } from "./layouts/init";

export const serviceMap = {
  components: ComponentsService,
  templates: TemplatesService,
  tables: TableService,
  projects: ProjectService,
  data_tables: DataTableService,
  project_styles: ProjectStyleService,
  columns: ColumnService,
  layouts: LayoutService,
};
