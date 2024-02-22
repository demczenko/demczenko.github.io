import { useParams } from "react-router-dom";
import { PageContainer } from "..";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";
import { SkeletonCard } from "@/components/SkeletonCard";
import ErrorPage from "@/ErrorPage";
import { useQueryClient } from "react-query";
import NotFound from "@/NotFound";
import { useLayout } from "@/hooks/layouts/useLayout";
import { useLayoutUpdate } from "@/hooks/layouts/useLayoutUpdate";
import RenderList from "@/components/RenderList";
import SectionCart from "./SectionCart";
import PreviewLayout from "./PreviewLayout";
import { useState } from "react";
import { CreateForm } from "@/components/CreateForm";
import { SelectComponent } from "../Projects/ProjectsModal/SelectComponent";
import { DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Loader, PlusCircle } from "lucide-react";

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const { id } = useParams();
  const client = useQueryClient();

  const { data: layout, error, isError, isLoading } = useLayout(id);

  const {
    mutate: updateLayout,
    isError: layoutUpdateIsError,
    isLoading: layoutUpdateIsLoading,
  } = useLayoutUpdate(layout?.id);

  const handleCreateSection = async (section) => {
    const new_section = {
      id: uuidv4(),
      ...section,
      type: "component",
      createdat: Date.now(),
      render_on: null,
    };

    updateLayout(
      {
        layout: [...layout.layout, new_section],
      },
      {
        onError: () => {
          toast({
            variant: "destructive",
            title: "Failed to create section",
            description: "Something went wrong",
          });
        },
        onSettled: () => {
          setIsModalOpen(false);
          client.invalidateQueries(`layout-${layout.id}`);
        },
        onSuccess: () => {
          toast({
            variant: "success",
            title: "Success",
            description: "Project added successfully",
          });
        },
      }
    );
  };

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = layout.layout.indexOf(
        layout.layout.find((item) => item.id === active.id)
      );
      const newIndex = layout.layout.indexOf(
        layout.layout.find((item) => item.id === over.id)
      );
      const shifted = arrayMove(layout.layout, oldIndex, newIndex);
      updateLayout(
        {
          layout: shifted,
        },
        {
          onError: () => {
            toast({
              variant: "destructive",
              title: "Failed to change layout",
              description: "Something went wrong",
            });
          },
          onSettled: () => {
            setIsModalOpen(false);
            client.invalidateQueries(`layout-${layout.id}`);
          },
          onSuccess: () => {
            toast({
              variant: "success",
              title: "Success",
              description: "Layout changed successfully",
            });
          },
        }
      );
    }
  }

  if (isLoading) {
    return <SkeletonCard isContainer={true} />;
  }

  if (isError) {
    return <ErrorPage title={`Something went wrong while layout loading...`} />;
  }

  if (!layout) {
    return (
      <NotFound
        title={"Component you are trying to access not found."}
        action={{ to: "/layouts", title: "Go to layouts" }}
      />
    );
  }

  return (
    <PageContainer title={"Layout " + layout.layout_name}>
      <div className="flex lg:gap-12 gap-4 xl:flex-row flex-col">
        <PreviewLayout layout={layout.layout} />
        <div className="flex gap-4 flex-col w-full items-start">
          <RenderList
            action={{
              id: 1,
              name: "Create Section",
              icon: <PlusCircle className="h-4 w-4" />,
              onClick: () => setIsModalOpen(true),
            }}
            title={"Sections"}
            list={[]}
          />

          <DndContext onDragEnd={handleDragEnd}>
            <SortableContext
              items={layout.layout}
              strategy={verticalListSortingStrategy}
            >
              {layout.layout?.map((item, i) => {
                return (
                  <SectionCart
                    isDisabled={layoutUpdateIsLoading}
                    key={item.id}
                    item={item}
                    layout={layout}
                  />
                );
              })}
            </SortableContext>
          </DndContext>
        </div>
      </div>
      <CreateForm
        isLoading={layoutUpdateIsLoading}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        fields={[
          {
            id: 1,
            name: "section_name",
            label: "Section Name",
            placeholder: "section name",
          },
          {
            id: 2,
            name: "component_id",
            label: "Component",
            content: (form) => (
              <SelectComponent
                onSelect={(template) => form.setValue("component_id", template)}
                value={form.getValues("component_id")}
              />
            ),
          },
        ]}
        onSubmit={(section) => handleCreateSection(section)}
        title={"Create section"}
        description={"Enter section name, select item to render."}
      />
    </PageContainer>
  );
};

export default Layout;
