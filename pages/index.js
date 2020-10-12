import Maps from '../component/Maps'
import NavigationBar from '../component/NavigationBar'

const Index = () => {
  return (
    <div className="h-screen v-screen">
      <NavigationBar />
      <div className="grid grid-cols-2">
        <div className="h-screen flex flex-col">

          <div className="bg-orange-400 h-20">ประเภทรถ</div>

          <div className="h-10 my-5">
            เส้นทาง (สูงสุด 20)
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              ดาวน์โหลดเทมเพลต
            </button>
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              นำเข้าที่อยู่
            </button>
          </div>
          <div>
          </div>

          <div className="h-30 my-5">
            <div className="flex flex-col">
              <div class="flex items-center border-b border-teal-500 py-2">
                <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="จุดรับสินค้า" aria-label="Full name" />
              </div>
              <div class="flex items-center border-b border-teal-500 py-2">
                <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="จุดส่งสินค้า" aria-label="Full name" />
              </div>
            </div>
          </div>

          <div className="h-50 my-5 flex flex-col">
            บริการเสริม
            <div><input type="checkbox" />ทดสอบ</div>
            <div><input type="checkbox" />ทดสอบ</div>
            <div><input type="checkbox" />ทดสอบ</div>
            <div><input type="checkbox" />ทดสอบ</div>
            <div><input type="checkbox" />ทดสอบ</div>
            <div><input type="checkbox" />ทดสอบ</div>
          </div>

        </div>
        <div className="h-screen">
          <Maps />
        </div>
      </div>
    </div>
  )
}

export default Index