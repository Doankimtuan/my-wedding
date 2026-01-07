import { getWeddingInfo, updateWeddingInfo } from "@/app/actions/content";
import { ContentForm } from "@/components/admin/content/ContentForm";

export default async function ContentPage() {
  const weddingInfo = await getWeddingInfo();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900 font-playfair">
          Wedding Content
        </h1>
        <p className="text-stone-500 text-sm">
          Edit your wedding information and details
        </p>
      </div>

      <ContentForm weddingInfo={weddingInfo} action={updateWeddingInfo} />
    </div>
  );
}
