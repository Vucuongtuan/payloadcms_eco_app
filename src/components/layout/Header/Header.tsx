import { findSettings } from "@/service/layout";
import { Lang } from "@/types";
export default async function Header(props: Lang) {
  const { lang } = props;
  const query = await findSettings(lang, "nav");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl text-foreground">
                (V - {lang})
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          {/*<nav className="hidden md:flex items-center space-x-8">
            {menu?.navItems?.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </nav>*/}

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            {/*<div className="relative">
              <AnimatePresence>
                {isSearchOpen ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 240, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center"
                  >
                    <Input
                      type="text"
                      placeholder="Search..."
                      className="pr-10"
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleSearch}
                      className="absolute right-2 h-6 w-6 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleSearch}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Search className="h-5 w-5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>*/}
          </div>

          {/* Mobile Menu Button */}
          {/*<div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="p-2 text-foreground hover:text-primary transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>*/}
        </div>
      </div>
    </header>
  );
}
