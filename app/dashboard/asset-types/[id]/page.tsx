import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function AssetTypeDetailPage({ params }: { params: { id: string } }) {
  const assetTypeId = params.id

  // This would typically come from an API or database
  const assetType = {
    id: assetTypeId,
    title: `Asset Type - ${assetTypeId}`,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  }

  // Generate dynamic assets based on the asset type ID
  const generateAssets = (typeId: string) => {
    return Array.from({ length: 6 }, (_, index) => {
      const assetId = `${typeId}${String.fromCharCode(97 + index)}` // Creates IDs like "1a", "1b", "2a", "2b", etc.
      return {
        id: assetId,
        title: `Asset ${assetId}`,
        description:
          "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since.",
        image: `/placeholder.svg?height=200&width=400&text=Asset ${assetId}`,
      }
    })
  }

  const assets = generateAssets(assetTypeId)

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#005580]">{assetType.title}</h1>
        <Button className="bg-[#005580] hover:bg-[#0077b6] text-white rounded-full">Create New</Button>
      </div>

      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Input type="text" placeholder={`Search in ${assetType.title}`} className="pr-10 border-gray-200" />
            <button className="absolute right-0 top-0 h-full px-3 bg-[#005580] text-white rounded-r-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <button className="p-3 border rounded-md text-[#005580]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <Card key={asset.id} className="shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="relative h-48 bg-gray-100">
              <div className="absolute top-2 left-2 bg-[#005580] text-white px-2 py-1 text-sm rounded">
                {asset.title}
              </div>
              <Image
                src={asset.image || "/placeholder.svg"}
                alt={asset.title}
                width={400}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
            <CardContent className="p-4">
              <p className="text-gray-600 text-sm line-clamp-3">{asset.description}</p>
            </CardContent>
            <CardFooter className="flex justify-center p-4 pt-0">
              <Button variant="outline" className="text-[#005580] border-[#005580]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                View
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
