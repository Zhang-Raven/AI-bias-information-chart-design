export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <p className="text-white/70 mb-4 max-w-md">
              AI 是一面特殊的镜子。
            </p>
            <p className="text-sm text-white/50 italic">"它折射的不仅仅是训练数据中沉淀的历史偏见，更通过算法将其放大、固化为看似客观的“规律”"</p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">设计目录</h3>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  数据背景
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  标签云视
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  镜中性别
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  镜中何为
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">制作团队</h3>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  张瑞雯Raven zrw.raven@gmail.com
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  白昊灵Penutmilk 1514228355@qq.com
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  傅宬博Bob 292901802@qq.com
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  指导老师：吴琼、肖岚茜、青霄
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/50">
          <p>&copy; 2025.12.29 小组版权所有</p>
        </div>
      </div>
    </footer>
  )
}
